import "./Card_Header.css";
import companyLogo from "../assets/dreambot Logo.png";   // adjust path if needed

function Header() {
  return (
    <div className="header-card">
      
      {/* Left section */}
      <div className="header-left">
        <button className="header-link">Home</button>

        {/* Company Logo */}
        <img
          src={companyLogo}
          alt="Company Logo"
          className="header-logo"
        />
      </div>

      {/* Center section */}
      <div className="header-center">
        Inventory Management System
      </div>

      {/* Right section */}
      <div className="header-right">
        <button className="header-link">Support</button>
        <button className="header-link">Login</button>
      </div>

    </div>
  );
}

export default Header;
