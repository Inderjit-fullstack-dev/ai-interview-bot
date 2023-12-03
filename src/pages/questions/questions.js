import React, { useEffect, useState } from "react";
import "./questions.css";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const questionsInStorage = localStorage.getItem("questions");
    console.log("questioninstorage", questionsInStorage);
    if (!questionsInStorage) {
      navigate("/job-experience");
    } else {
      const questions = JSON.parse(questionsInStorage);
      if (questions.length > 0) {
        setQuestions(questions);
        setCurrentQuestion(questions[currentIndex]);
      }
    }

    const recognition = new window.webkitSpeechRecognition();
    console.log(recognition);
    if (recognition) {
      setRecognition(recognition);
    }
  }, [currentIndex, navigate]);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      setAnswer(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      startRecognition();
    };

    recognition.start();
    return recognition;
  };

  const toggleRecognition = () => {
    if (isRecording) {
      console.log("reccoding... if");
      recognition.stop();
      setIsRecording(false);
      setRecognition(null);
    } else {
      const recognitionRef = startRecognition();
      setRecognition(recognitionRef);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const index = currentIndex + 1;
      setCurrentIndex(index);
      const question = questions.find((x) => x.index === currentIndex);
      if (question) {
        setCurrentQuestion(question);
        setAnswer("");
      }
    }
  };

  return (
    <>
      {currentQuestion && (
        <div className="container">
          <h4>{currentQuestion.question}</h4>
          <InputTextarea
            autoResize
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            cols={60}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              label={isRecording ? "Stop" : "Say"}
              onClick={toggleRecognition}
            />
            <Button
              disabled={currentIndex === questions.length - 1}
              label="Attempt Next Question"
              onClick={handleNextQuestion}
            />
          </div>
        </div>
      )}
    </>
  );
}
