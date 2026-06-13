import "./LoginModal.css";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoginModal({
  open,
  onClose,
}: Props) {

  const [mode, setMode] =
    useState<"login" | "signup">(
      "login"
    );

  const [formData, setFormData] =
    useState({
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      mode === "signup" &&
      formData.password !==
      formData.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    console.log(
      mode.toUpperCase(),
      formData
    );

    /*
      LOGIN

      await loginUser({
        email:
          formData.email,
        password:
          formData.password
      });

      SIGNUP

      await registerUser({
        name:
          formData.name,
        company:
          formData.company,
        email:
          formData.email,
        password:
          formData.password
      });
    */
  };

  return (

    <div
      className="login-overlay"
      onClick={onClose}
    >

      <div
        className="login-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <h2>

          {
            mode === "login"
              ? "Login"
              : "Create Account"
          }

        </h2>

        <form
          onSubmit={handleSubmit}
        >

          {
            mode === "signup" &&
            (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={
                    formData.company
                  }
                  onChange={
                    handleChange
                  }
                />
              </>
            )
          }

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          {
            mode === "signup" &&
            (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                required
              />
            )
          }

          <button
            type="submit"
          >

            {
              mode === "login"
                ? "Sign In"
                : "Create Account"
            }

          </button>

        </form>

        <div
          className="login-footer"
        >

          {
            mode === "login"
              ? (
                <>
                  Don't have an
                  account?

                  <span
                    className="auth-link"
                    onClick={() =>
                      setMode(
                        "signup"
                      )
                    }
                  >
                    {" "}
                    Sign Up
                  </span>
                </>
              )
              : (
                <>
                  Already have an
                  account?

                  <span
                    className="auth-link"
                    onClick={() =>
                      setMode(
                        "login"
                      )
                    }
                  >
                    {" "}
                    Sign In
                  </span>
                </>
              )
          }

        </div>

      </div>

    </div>
  );
}

export default LoginModal;

