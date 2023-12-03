import React, { useEffect, useState } from "react";
import "./questions.css";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { TailSpin } from "react-loader-spinner";
import getAIResult from "../../utils/gptUtility";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);
  useEffect(() => {
    const questionsInStorage = localStorage.getItem("questions");
    if (!questionsInStorage) {
      navigate("/job-experience");
    } else {
      const questions = JSON.parse(questionsInStorage);
      if (questions.length > 0) {
        setQuestions(questions);
        setCurrentQuestion(questions[currentIndex]);
        setAnswer(questions[currentIndex].answer || "");
      }
    }
  }, [currentIndex, navigate]);

  const handleNextQuestion = async () => {
    const userAnswer = answer.trim();
    if (userAnswer === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter your answer!!!",
        life: 2000,
      });
      return;
    }

    // update the answer before moving to next question.
    await setUserAnswerToQuestion(currentIndex);

    // move to the next question if applicable.
    if (currentIndex < questions.length - 1) {
      const index = currentIndex + 1;
      setCurrentIndex(index);
      const question = questions.find((x) => x.index === currentIndex);
      if (question) {
        setCurrentQuestion(question);
        setAnswer("");
      }
    }

    if (currentIndex === questions.length - 1) {
      navigate("/interview-result");
    }
  };

  const setUserAnswerToQuestion = async (index) => {
    let questionStr = localStorage.getItem("questions");
    if (questionStr) {
      const questions = JSON.parse(questionStr);
      var questionToBeUpdated = questions.find((q) => q.index === index);

      if (questionToBeUpdated != null) {
        questionToBeUpdated.answer = answer;

        // check the correctness of the answer

        setLoader(true);
        const result = await getAIResult(
          `Question: ${questionToBeUpdated.question} and UserAnswer: ${questionToBeUpdated.answer}, give me the correctness in integer  of the userAnswer in percentage out of 100 `
        );
        setLoader(false);

        if (result) {
          questionToBeUpdated.correctness = result;
          questions[index] = questionToBeUpdated;
          console.log("questions", questions);
          localStorage.setItem("questions", JSON.stringify(questions));
        }
      }
    }
  };

  return (
    <>
      <Toast ref={toast} />
      {loader && (
        <TailSpin
          height="80"
          width="80"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, .8)",
            height: "100vh",
            position: "absolute",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            zIndex: 100,
          }}
          wrapperClass=""
          visible={true}
        />
      )}
      {currentQuestion && (
        <div className="container">
          <h4>{currentQuestion.question}</h4>
          <InputTextarea
            autoResize
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={10}
            cols={60}
          />
          <div style={{ marginTop: "10px" }}>
            {/* <Button
              label={isRecording ? "Stop" : "Say"}
              onClick={toggleRecognition}
            /> */}
            <Button
              disabled={currentIndex > questions.length - 1}
              label={
                currentIndex === questions.length - 1
                  ? "Submit"
                  : "Attempt Next Question"
              }
              onClick={handleNextQuestion}
            />
            &nbsp;
            <Button
              label="I don't know"
              onClick={() => {
                setAnswer("I don't know");
              }}
            />
            {/* <Button label="View Result" onClick={viewResult} /> */}
          </div>
        </div>
      )}
    </>
  );
}
