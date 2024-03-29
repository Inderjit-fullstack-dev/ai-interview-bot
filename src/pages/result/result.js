import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import "./result.css";
import { Button } from "primereact/button";

export default function Result() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [isPassed, setIsPassed] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const finalResultInStr = localStorage.getItem("questions");
    if (!finalResultInStr) {
      navigate("/");
      return;
    }

    const email = localStorage.getItem("user_email");
    if (!email) {
      navigate("/");
      return;
    }

    setEmail(email);
    const result = JSON.parse(finalResultInStr);
    if (result) {
      setAnswers(result);
      const totalCorrectness = result.reduce(
        (sum, item) => sum + parseInt(item.correctness),
        0
      );
      const thresholdScore = (result.length * 100) / 2;

      console.log("totalCorrectness", totalCorrectness);
      console.log("thresholdScore", thresholdScore);

      const isPassed = totalCorrectness >= thresholdScore ? true : false;
      setIsPassed(isPassed);
    }
  }, []);

  return (
    <div className="container">
      <div
        style={{
          backgroundColor: isPassed ? "#6cea76" : "#f56b6b",
          color: isPassed ? "green" : "#fff",
          padding: 10,
          borderRadius: 4,
          fontWeight: "bold",
        }}
      >
        {isPassed
          ? `Hi ${email}, You passed the AI interview`
          : `Hi ${email}, Unfortunately you are not selected for the second round!`}
      </div>
      {answers.map((ans) => (
        <div key={ans.index}>
          <h3>Question: {ans.question}</h3>
          <h4>Answer: {ans.answer}</h4>
          <p>Correctness: {ans.correctness}%</p>
          {/* <p>{ans.reason && <span>Reason: {ans.reason}</span>}</p> */}
        </div>
      ))}

      <div className="continue-button">
        <div className="max-width-42">
          <Button
            label="Go to Home page"
            severity="secondary"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}
