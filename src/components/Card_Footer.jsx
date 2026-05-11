import { useState } from "react";
import "./Card_Footer.css";

function Footer() {
  const [statusMessage, setStatusMessage] = useState(
    "System ready. Waiting for action..."
  );
  const [aiQuery, setAiQuery] = useState("");

  const askAI = () => {
    if (aiQuery.trim() === "") return;
    alert("AI Query: " + aiQuery);
    setAiQuery("");
  };

  return (
    <div className="footer-card">

      {/* Left: Status / System Message */}
      <div className="footer-status">
        {statusMessage}
      </div>

      {/* Right: AI Input */}
      <div className="footer-ai">
        <input
          type="text"
          placeholder="Ask AI..."
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          className="ai-input"
        />
        <button onClick={askAI} className="ai-btn">
          Ask
        </button>
      </div>

    </div>
  );
}

export default Footer;
