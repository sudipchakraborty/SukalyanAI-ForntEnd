import "./Card_Header.css";
import companyLogo from "../assets/logo_sukalyanAI.png";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import { menuConfig }
from "../config/menuConfig";

import LoginModal
from "./LoginModal";

function Header() {

  const navigate = useNavigate();

  const location = useLocation();

  const [showLogin,
    setShowLogin] =
    useState(false);

  const goHome = () => {

    if (location.pathname === "/") {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } else {

      navigate("/");
    }
  };

  const goContact = () => {

    if (location.pathname !== "/") {

      navigate("/");

      setTimeout(() => {

        document
          .getElementById("contact")
          ?.scrollIntoView({
            behavior: "smooth",
          });

      }, 300);

    } else {

      document
        .getElementById("contact")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  const goGetStarted = () => {

    navigate("/products");

  };

  return (

    <>
      <header className="header-card">

        {/* LEFT */}

        <div className="header-left">

          <img
            src={companyLogo}
            alt="SukalyanAI"
            className="header-logo"
            onClick={goHome}
          />

          <div
            className="company-name"
            onClick={goHome}
          >
            SukalyanAI
          </div>

        </div>

        {/* CENTER */}

        <nav className="header-center">

          <button
            className="nav-link"
            onClick={goHome}
          >
            Home
          </button>

          {menuConfig.map((menu) => (

            <div
              key={menu.title}
              className="dropdown"
            >

              <button
                className="nav-link"
              >
                {menu.title} ▼
              </button>

              <div className="dropdown-menu">

                {menu.items.map((item) => (

                  <button
                    key={item.title}
                    className="dropdown-item"
                    onClick={() =>
                      navigate(item.url)
                    }
                  >
                    {item.title}
                  </button>

                ))}

              </div>

            </div>

          ))}

          <button
            className="nav-link"
            onClick={goContact}
          >
            Contact
          </button>

        </nav>

        {/* RIGHT */}

        <div className="header-right">

          <button
            className="login-btn"
            onClick={() =>
              setShowLogin(true)
            }
          >
            Login
          </button>

          <button
            className="start-btn"
            onClick={goGetStarted}
          >
            Get Started
          </button>

        </div>

      </header>

      <LoginModal
        open={showLogin}
        onClose={() =>
          setShowLogin(false)
        }
      />

    </>
  );
}

export default Header;

