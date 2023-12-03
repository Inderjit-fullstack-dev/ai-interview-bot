import React, { useEffect, useState } from "react";
import "./questions.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export default function Questions() {
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleNext = () => {
    if (currentIndex < questions.length) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex].answer =
        updatedQuestions[currentIndex].answer || ""; // Update answer if not present
      setQuestions(updatedQuestions);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].answer = e.target.value;
    setQuestions(updatedQuestions);
  };

  if (
    !questions ||
    questions.length === 0 ||
    currentIndex >= questions.length
  ) {
    return <div>No questions available!</div>;
  }

  const currentQuestion = questions[currentIndex];

  const submitAwnsers = () => {
    console.log("questions", questions);
  };

  return (
    <div className="question-container">
      <div className="card">
        <div className="card-content">
          <h3 className="mb-20">{currentQuestion.question.split(".")[0]}</h3>
          <h1 className="mb-20">{currentQuestion.question.split(".")[1]}</h1>
          <InputTextarea
            placeholder="Type..."
            value={currentQuestion.answer || ""}
            onChange={handleAnswerChange}
            rows={5}
            cols={30}
            className="mb-20"
            autoResize={false}
          />
          <div className="next-button mb-20">
            {/* <Button label="Previous" severity="help" onClick={handleNext} /> */}
            {currentQuestion.index !== 0 && (
              <Button
                label="Previous"
                severity="help"
                outlined
                onClick={() => handlePrevious()}
              />
            )}
            {currentQuestion.index !== questions.length - 1 && (
              <Button
                label="Next"
                severity="help"
                onClick={() => handleNext()}
              />
            )}
            {currentQuestion.index === questions.length - 1 && (
              <Button
                label="Submit"
                severity="help"
                onClick={() => submitAwnsers()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
