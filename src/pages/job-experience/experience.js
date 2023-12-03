import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import * as pdfjs from "pdfjs-dist";
import getAIResult from "../../utils/gptUtility";
import { TailSpin } from "react-loader-spinner";
import "./experience.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Experience() {
  const [experience, setExperience] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loader, setLoader] = useState(false);
  let [pageText, setPageText] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();
  const data = [
    { name: "You are a newbie", code: "no experience" },
    { name: "Under 5 Years", code: "less than 5 years of experience" },
    { name: "Above 5 Years", code: " more than 5 years of experience" },
  ];

  const TOTAL_QUESTIONS = 5;

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (!email) {
      navigate("/");
      return;
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : null;

    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setUploadedFile(selectedFile);

      const reader = new FileReader();

      reader.onload = (e) => {
        const pdfData = new Uint8Array(e.target.result);
        loadAndParsePDF(pdfData);
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      alert("File size exceeds the limit (5MB) or no file selected.");
    }
  };

  const parseQuestions = (text) => {
    const questions = text.split("\n");
    const questionObj = questions.map((question, index) => {
      return {
        index: index,
        question: question,
        answer: "",
        correctness: 0,
      };
    });

    localStorage.setItem("questions", JSON.stringify(questionObj));
    navigate("/interview-questions");
  };

  const handleProceedNext = async () => {
    if (!experience) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "You need to select experience!",
        life: 2000,
      });
      return;
    }

    if (!pageText) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No Keyword found in your resume.",
        life: 2000,
      });
      return;
    }
    try {
      localStorage.setItem("meta", pageText);
      setLoader(true);
      const prompt = `Generate ${TOTAL_QUESTIONS} interview questions with no answer for a candidate having ${experience}, focusing on their expertise in ${pageText}. and do not repeat the question.`;
      const result = await getAIResult(prompt);
      setLoader(false);

      if (result) {
        parseQuestions(result);
      }
    } catch (error) {
      setLoader(false);
      console.log("error gpt", error);
    }
  };

  const loadAndParsePDF = async (pdfData) => {
    try {
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      const numPages = pdf.numPages;
      let pageText = "";
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        pageText += " " + text;
      }
      setPageText(pageText);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  return (
    <>
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
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            zIndex: 100,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
          }}
          wrapperClass=""
          visible={true}
        />
      )}
      <Toast ref={toast} />
      <div className="experience-container">
        <div className="experience-details">
          <h1 className="header">Almost Ready To Start Interview</h1>
          <Dropdown
            value={experience}
            onChange={(e) => setExperience(e.value)}
            options={data}
            optionLabel="name"
            placeholder="Your Experience..."
            className="w-full md:w-14rem"
          />
          <div>
            <h3>Resume (PDF - Max 5MB)</h3>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {uploadedFile && (
              <div>
                <h3>Uploaded File</h3>
                <p>{uploadedFile.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="continue-button">
          <div className="max-width-42">
            <Button
              label="Continue"
              severity="secondary"
              onClick={handleProceedNext}
            />
          </div>
        </div>
      </div>
    </>
  );
}
