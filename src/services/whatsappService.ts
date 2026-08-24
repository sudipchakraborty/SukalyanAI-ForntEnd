const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `http://${window.location.hostname || "127.0.0.1"}:3000`;

type WhatsAppResponse = {
  success: boolean;
  message: string;
  delivery?: {
    sid?: string;
    status?: string;
    to?: string;
  };
};

export async function sendWhatsAppAlert(
  mobileNumber: string,
  message: string,
): Promise<WhatsAppResponse> {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, "")}/api/whatsapp/send`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobileNumber, message }),
    },
  );
  const result = (await response.json()) as WhatsAppResponse;

  if (!response.ok) {
    throw new Error(result.message || "Unable to send WhatsApp alert.");
  }

  return result;
}
