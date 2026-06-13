import "./Card_Header.css";
import companyLogo from "../assets/logo_sukalyanAI.png";

function Header() {
  return (
    <header className="header-card">

      <div className="header-left">
        <img
          src={companyLogo}
          alt="SukalyanAI"
          className="header-logo"
        />

        <div className="company-name">
          SukalyanAI
        </div>
      </div>

      <nav className="header-center">
        <button className="nav-link">Home</button>

        <button className="nav-link">
          Products
        </button>

        <button className="nav-link">
          Solutions
        </button>

        <button className="nav-link">
          MQTT Cloud
        </button>

        <button
          className="nav-link"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          Contact
        </button>

        
      </nav>

      <div className="header-right">
        <button className="login-btn">
          Login
        </button>

        <button className="start-btn">
          Get Started
        </button>
      </div>

    </header>
  );
}

export default Header;

