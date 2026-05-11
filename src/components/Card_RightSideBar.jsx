import "./Card_RightSideBar.css";

function RightSideBar() {
  return (
    <div className="right-card">

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-box">
          <p className="stat-title">Current Stock</p>
          <h3>1,254</h3>
        </div>

        <div className="stat-box">
          <p className="stat-title">Low Stock</p>
          <h3>12</h3>
        </div>

        <div className="stat-box">
          <p className="stat-title">Pending Assembly</p>
          <h3>7</h3>
        </div>

        <div className="stat-box">
          <p className="stat-title">Today's Orders</p>
          <h3>23</h3>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="section">
        <h4>Activity Feed</h4>
        <ul className="activity-list">
          <li>🔔 Purchase order #343 approved</li>
          <li>📦 20 units moved to Assembly</li>
          <li>🧾 Invoice INV-2025-007 generated</li>
          <li>⚠️ Low stock alert: Motor X</li>
        </ul>
      </div>

      {/* AI Recommendation */}
      <div className="section ai-box">
        <h4>AI Recommendations</h4>
        <p>
          <strong>Auto-reorder suggestion:</strong><br />
          Order 50 × Motor X — predicted shortage in 3 days.
        </p>

        <div className="ai-actions">
          <button className="primary-btn">Create PO</button>
          <button className="secondary-btn">Dismiss</button>
        </div>
      </div>

    </div>
  );
}

export default RightSideBar;
