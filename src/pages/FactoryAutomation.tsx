import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import mqtt, { type MqttClient } from "mqtt";
import "./FactoryAutomation.css";

type AlertPayload = {
  site_id?: string;
  section_id?: string;
  camera_id?: string;
  event_id?: string;
  event_type?: string;
  status?: string;
  captured_data?: unknown;
  confidence?: number | null;
  comments?: string | null;
  remarks?: string | null;
  timestamp?: string;
  [key: string]: unknown;
};

type AlertEnvelope = {
  received_at?: string;
  alert?: AlertPayload;
};

type AlertRow = {
  id: string;
  receivedAt: string;
  site: string;
  section: string;
  camera: string;
  eventType: string;
  status: string;
  confidence: number | null;
  details: string;
};

type ConnectionState = "connecting" | "waiting" | "live" | "error";
type StreamMode = "direct" | "mediamtx";
type AlertMode = "socketio" | "mqtt";

const edgeHost = window.location.hostname || "127.0.0.1";
const streamMode: StreamMode =
  import.meta.env.VITE_FACTORY_STREAM_MODE === "mediamtx"
    ? "mediamtx"
    : "direct";
const streamUrl =
  import.meta.env.VITE_FACTORY_STREAM_URL || `http://${edgeHost}:8000`;
const alertUrl =
  import.meta.env.VITE_FACTORY_ALERT_URL ||
  import.meta.env.VITE_FACTORY_SOCKET_URL ||
  `http://${edgeHost}:5000`;
// Temporary public test token. Remove this fallback after validating the relay
// and provide VITE_FACTORY_SOCKET_TOKEN through a proper authentication flow.
const socketToken =
  import.meta.env.VITE_FACTORY_SOCKET_TOKEN ||
  "5532f62f4ce34bc5a5e8aba6fa53d013d1b8f22203247b7048324f62ebea4408";
const alertMode: AlertMode =
  import.meta.env.VITE_FACTORY_ALERT_MODE === "mqtt" ? "mqtt" : "socketio";
const mqttUrl =
  import.meta.env.VITE_FACTORY_MQTT_URL || `ws://${edgeHost}:9001/mqtt`;
const mqttTopic =
  import.meta.env.VITE_FACTORY_MQTT_TOPIC || "test/topic";
const mqttUsername = import.meta.env.VITE_FACTORY_MQTT_USERNAME || "";
const mqttPassword = import.meta.env.VITE_FACTORY_MQTT_PASSWORD || "";

const displayValue = (value: unknown, fallback = "—") => {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const formatDetails = (payload: AlertPayload) => {
  const text = payload.comments || payload.remarks;
  if (text) return String(text);
  if (payload.captured_data !== null && payload.captured_data !== undefined) {
    return typeof payload.captured_data === "string"
      ? payload.captured_data
      : JSON.stringify(payload.captured_data);
  }
  return "—";
};

const normalizeAlert = (message: AlertEnvelope | AlertPayload): AlertRow => {
  const envelope =
    "alert" in message && message.alert
      ? (message as AlertEnvelope)
      : { alert: message as AlertPayload };
  const payload = envelope.alert || {};
  const timestamp =
    displayValue(payload.timestamp, envelope.received_at || new Date().toISOString());

  return {
    id: displayValue(
      payload.event_id,
      `${displayValue(payload.camera_id, "camera")}-${timestamp}`,
    ),
    receivedAt: timestamp,
    site: displayValue(payload.site_id),
    section: displayValue(payload.section_id),
    camera: displayValue(payload.camera_id),
    eventType: displayValue(payload.event_type, "Unknown"),
    status: displayValue(payload.status, "UNKNOWN").toUpperCase(),
    confidence:
      typeof payload.confidence === "number" ? payload.confidence : null,
    details: formatDetails(payload),
  };
};

const waitForIceGathering = (peer: RTCPeerConnection) =>
  peer.iceGatheringState === "complete"
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        const listener = () => {
          if (peer.iceGatheringState === "complete") {
            peer.removeEventListener("icegatheringstatechange", listener);
            resolve();
          }
        };
        peer.addEventListener("icegatheringstatechange", listener);
      });

function FactoryAutomation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [streamState, setStreamState] =
    useState<ConnectionState>("connecting");
  const [alertConnected, setAlertConnected] = useState(false);
  const [streamError, setStreamError] = useState("");

  const disconnectStream = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    peerRef.current?.close();
    peerRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const connectStream = useCallback(async () => {
    disconnectStream();
    setStreamState("connecting");
    setStreamError("");

    const peer = new RTCPeerConnection();
    const controller = new AbortController();
    peerRef.current = peer;
    requestRef.current = controller;
    peer.addTransceiver("video", { direction: "recvonly" });

    peer.ontrack = (event) => {
      const video = videoRef.current;
      if (video && event.streams[0]) {
        video.srcObject = event.streams[0];
        void video.play().catch(() => undefined);
        setStreamState("live");
      }
    };

    peer.onconnectionstatechange = () => {
      if (peer.connectionState === "connected") setStreamState("live");
      if (["failed", "disconnected", "closed"].includes(peer.connectionState)) {
        setStreamState("error");
      }
    };

    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      await waitForIceGathering(peer);

      const signalingUrl = streamMode === "mediamtx"
        ? streamUrl
        : `${streamUrl.replace(/\/$/, "")}/offer`;
      const response = await fetch(signalingUrl, streamMode === "mediamtx"
        ? {
            method: "POST",
            headers: {
              "Content-Type": "application/sdp",
              Accept: "application/sdp",
            },
            body: peer.localDescription?.sdp,
            signal: controller.signal,
          }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(peer.localDescription),
            signal: controller.signal,
          });
      if (!response.ok) throw new Error(await response.text());

      const answer: RTCSessionDescriptionInit = streamMode === "mediamtx"
        ? { type: "answer", sdp: await response.text() }
        : (await response.json()) as RTCSessionDescriptionInit;
      await peer.setRemoteDescription(answer);
      setStreamState((current) => current === "live" ? current : "waiting");
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      peer.close();
      setStreamError(error instanceof Error ? error.message : "Unable to connect");
      setStreamState("error");
    }
  }, [disconnectStream]);

  useEffect(() => {
    const startup = window.setTimeout(() => void connectStream(), 0);
    return () => {
      window.clearTimeout(startup);
      disconnectStream();
    };
  }, [connectStream, disconnectStream]);

  useEffect(() => {
    const receiveAlert = (message: AlertEnvelope | AlertPayload) => {
      const next = normalizeAlert(message);
      setAlerts((current) => [
        next,
        ...current.filter((item) => item.id !== next.id),
      ].slice(0, 100));
    };

    if (alertMode === "mqtt") {
      const client: MqttClient = mqtt.connect(mqttUrl, {
        username: mqttUsername || undefined,
        password: mqttPassword || undefined,
        clientId: `sukalyanai-web-${crypto.randomUUID()}`,
        clean: true,
        reconnectPeriod: 2_000,
        connectTimeout: 10_000,
      });

      client.on("connect", () => {
        client.subscribe(mqttTopic, { qos: 1 }, (error) => {
          setAlertConnected(!error);
        });
      });
      client.on("reconnect", () => setAlertConnected(false));
      client.on("close", () => setAlertConnected(false));
      client.on("error", () => setAlertConnected(false));
      client.on("message", (_topic, payload) => {
        try {
          receiveAlert(JSON.parse(payload.toString()) as AlertPayload);
        } catch {
          // Ignore malformed/non-JSON messages on the test topic.
        }
      });

      return () => {
        setAlertConnected(false);
        void client.endAsync();
      };
    }

    const socket: Socket = io(alertUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      auth: socketToken ? { token: socketToken } : undefined,
    });

    socket.on("connect", () => setAlertConnected(true));
    socket.on("disconnect", () => setAlertConnected(false));
    socket.on("connect_error", () => setAlertConnected(false));
    const socketAlertEvents = [
      "alert_received",
      "alert:new",
      "incident:new",
      "incident",
      "alert",
    ];
    socketAlertEvents.forEach((eventName) => {
      socket.on(eventName, receiveAlert);
    });

    return () => {
      socketAlertEvents.forEach((eventName) => {
        socket.off(eventName, receiveAlert);
      });
      socket.disconnect();
    };
  }, []);

  const statusText = {
    connecting: "Connecting",
    waiting: "Waiting for video",
    live: "Live",
    error: "Stream unavailable",
  }[streamState];

  return (
    <main className="factory-monitor">
      <section className="factory-heading">
        <div>
          <span className="factory-eyebrow">Factory automation</span>
          <h1>Live incident monitor</h1>
          <p>Real-time camera intelligence and safety alerts in one place.</p>
        </div>
        <div className="connection-badges">
          <div className={`factory-status factory-status--${streamState}`}>
            <span />
            Video: {statusText}
          </div>
          <div className={`factory-status factory-status--${alertConnected ? "live" : "error"}`}>
            <span />
            {alertMode === "mqtt" ? "MQTT" : "Alerts"}:{" "}
            {alertConnected ? "Connected" : "Disconnected"}
          </div>
        </div>
      </section>

      <section className="feed-card">
        <div className="feed-card__top">
          <div>
            <span className="feed-label">Live feed</span>
            <h2>Factory floor camera</h2>
          </div>
          <span className="camera-chip">
            {streamMode === "mediamtx" ? "MediaMTX / WHEP" : "Edge / WebRTC"}
          </span>
        </div>
        <div className="video-frame">
          <video ref={videoRef} autoPlay playsInline muted />
          {streamState !== "live" && (
            <div className="video-placeholder" role="status">
              <span className="camera-icon" aria-hidden="true">◎</span>
              <strong>{statusText}</strong>
              <small>
                {streamError || "The live stream will appear when the edge camera is available."}
              </small>
              {streamState === "error" && (
                <button type="button" className="retry-button" onClick={connectStream}>
                  Retry stream
                </button>
              )}
            </div>
          )}
          {streamState === "live" && <span className="live-badge"><i /> Live</span>}
        </div>
      </section>

      <section className="incident-card">
        <div className="incident-heading">
          <div>
            <span className="feed-label">Alert log</span>
            <h2>Current alerts</h2>
            <p className="alert-source">
              Source: {alertMode === "mqtt" ? "MQTT" : "Socket.IO"}
              {alertMode === "mqtt" && (
                <>
                  {" "}· Topic: <code>{mqttTopic}</code>
                </>
              )}
            </p>
          </div>
          <span className="incident-count">{alerts.length} received</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date &amp; time</th>
                <th>Site</th>
                <th>Section</th>
                <th>Camera</th>
                <th>Event</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length ? alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{formatDate(alert.receivedAt)}</td>
                  <td>{alert.site}</td>
                  <td>{alert.section}</td>
                  <td><span className="camera-id">{alert.camera}</span></td>
                  <td>{alert.eventType}</td>
                  <td>
                    <span className={`incident-type incident-type--${alert.status.toLowerCase()}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td>{alert.confidence === null ? "—" : `${(alert.confidence * 100).toFixed(1)}%`}</td>
                  <td className="alert-details" title={alert.details}>{alert.details}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="empty-incidents">
                    <strong>No alerts received</strong>
                    <span>New VisualAI alerts will appear here automatically.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default FactoryAutomation;
