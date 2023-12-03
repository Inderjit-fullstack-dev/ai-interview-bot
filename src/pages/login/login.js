import React, { useRef, useState } from "react";
import "./login.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Login() {
  const toast = useRef(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    setEmail(email || "");
  }, []);

  const submitEmail = () => {
    const sanitizedEmail = email.trim();
    if (sanitizedEmail === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please enter your email...",
        life: 2000,
      });
      return;
    }

    localStorage.setItem("user_email", email);
    navigate("/job-experience");
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="login-container">
        <div className="login-details">
          <h1 className="header">Start Interview with LevelUp</h1>

          <div className="flex flex-column gap-2 email-input">
            <label htmlFor="email">Enter your email</label>
            <InputText
              id="email"
              aria-describedby="email-help"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <small id="email-help">
            We will verify this email on the next step.
          </small> */}
          </div>
        </div>

        <div className="continue-button">
          <div className="max-width-42">
            <Button
              label="Continue"
              severity="secondary"
              onClick={submitEmail}
            />
          </div>
        </div>
      </div>
    </>
  );
}
