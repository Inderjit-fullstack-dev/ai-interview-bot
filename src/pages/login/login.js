import React from "react";
import "./login.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function Login() {
  const submitEmail = () => {};

  return (
    <div className="login-container">
      <div className="login-details">
        <h1 className="header">Start Interview with LevelUp</h1>

        <div className="flex flex-column gap-2 email-input">
          <label htmlFor="email">Enter your work email</label>
          <InputText
            id="email"
            aria-describedby="email-help"
            placeholder="name@gmail.com"
          />
          <small id="email-help">
            We’ll verify this email on the next step.
          </small>
        </div>
      </div>

      <div className="continue-button">
        <div className="max-width-42">
          <Button label="Continue" severity="secondary" onClick={submitEmail} />
        </div>
      </div>
    </div>
  );
}
