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

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    console.log({
      email,
      password,
    });

    /*
      Later:
      call backend auth api
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
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
          >
            Sign In
          </button>

        </form>

        <div
          className="login-footer"
        >

          Forgot Password?

        </div>

      </div>

    </div>
  );
}

export default LoginModal;