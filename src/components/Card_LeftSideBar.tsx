import "./Card_LeftSideBar.css";

function LeftSideBar() {

  const btn_materialPurchase = () => alert("Pressed Material Purchase");
  const btn_materialUsed = () => alert("Pressed Material Used");
  const btn_readyProduct = () => alert("Pressed Ready Product");
  const btn_Sell = () => alert("Pressed Sell");
  const btn_expanses = () => alert("Pressed Expenses");
  const btn_orderEntry = () => alert("Pressed Order Entry");
  const btn_billGenerate = () => alert("Pressed Bill Generate");

  return (
    <div className="card">
      <button onClick={btn_materialPurchase} className="sidebar-btn">
        📦 <span>Material Purchase</span>
      </button>

      <button onClick={btn_materialUsed} className="sidebar-btn">
        🧾 <span>Material Used</span>
      </button>

      <button onClick={btn_readyProduct} className="sidebar-btn">
        🏷️ <span>Ready Product</span>
      </button>

      <button onClick={btn_Sell} className="sidebar-btn">
        💰 <span>Sell</span>
      </button>

      <button onClick={btn_expanses} className="sidebar-btn">
        💸 <span>Expenses</span>
      </button>

      <button onClick={btn_orderEntry} className="sidebar-btn">
        📝 <span>Order Entry</span>
      </button>

      <button onClick={btn_billGenerate} className="sidebar-btn">
        🧾 <span>Bill Generate</span>
      </button>
    </div>
  );
}

export default LeftSideBar;
