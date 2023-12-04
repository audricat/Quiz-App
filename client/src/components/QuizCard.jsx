import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../database/Questions";


import Swal from "sweetalert2";
const QuizCard = () => {


  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(Questions.length));
  const { itemNumber, question, choices } = Questions[page];
  const navigate = useNavigate();

  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers === null || currentAnswers === undefined) {
      localStorage.setItem("users_answers", JSON.stringify(answers));
    }
  });
  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers) {
      setAnswers(currentAnswers);
    }
  }, [setAnswers]);

  const progress = () => {
    return (itemNumber * 100) / Questions.length;
  };

  const numToChar = (num) => {
    const char = ["A", "B", "C", "D"];
    return num <= char.length ? char[num] : null;
  };

  const handleNext = () => {
    if (page !== Questions.length - 1) {
      setPage((page) => page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  const handleAnswers = (choice) => {
    const oldAnswers = [...answers];
    oldAnswers.splice(itemNumber - 1, 1, choice);
    setAnswers(oldAnswers);
    localStorage.setItem("users_answers", JSON.stringify(oldAnswers));
  };

  const selectedAnswer = (idx) => {
    return answers[itemNumber - 1] === numToChar(idx) ? true : false;
  };




  const submitResponse = () => {
 
    Swal.fire({
      title: "Are you sure you want to submit your quiz?",
      text: "Once submitted, you cannot make any changes.",
      showCancelButton: true,
      cancelButtonText: "CANCEL",


      confirmButtonText: "SUBMIT",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(function (res) {
      if(res.isConfirmed){
        navigate("/score", { replace: true });
      }
    });
  };

  return (
    <ul className="quiz-card">
      <li className="quiz-questions">
        <div className="quiz-questions-wrapper">
          <p className="quiz-questions-text">
            <span>{itemNumber}.</span> {question}
          </p>
        </div>
      </li>
      <li className="quiz-choices">
        <div className="quiz-choices-wrapper">
          {choices.map((choice, idx) => {
            return (
              <button
                className="quiz-buttons"
                id={selectedAnswer(idx) ? "button-selected" : "button-choices"}
                key={idx}
                onClick={() => handleAnswers(numToChar(idx))}
              >
                <span
                  className="quiz-buttons-span"
                  id={
                    selectedAnswer(idx)
                      ? "button-span-selected"
                      : "button-span-choices"
                  }
                >
                  {numToChar(idx)}.{choice}
                </span>
              </button>
            );
          })}
        </div>
      </li>
      <li className="quiz-navigations">
        <div className="quiz-navigations-wrapper">
          <button
            className="quiz-buttons"
            id="button-navigation"
            onClick={handlePrevious}
          >
            <span className="quiz-buttons-span" id="button-span-navigation">
              PREV
            </span>
          </button>

          {itemNumber === Questions.length ? (
            <button
              className="quiz-buttons"
              id="button-submit"
              onClick={submitResponse}
            >
              <span className="quiz-buttons-span" id="button-span-submit">
                SUBMIT
              </span>
            </button>
          ) : (
            <button
              className="quiz-buttons"
              id="button-navigation"
              onClick={handleNext}
            >
              <span className="quiz-buttons-span" id="button-span-navigation">
                NEXT
              </span>
            </button>
          )}
        </div>
      </li>

      <li className="quiz-progress-items">
        <span className="quiz-item-count">
          {itemNumber}/{Questions.length}
        </span>
      </li>

      <li className="quiz-progress-bar">
        <div
          className="quiz-progress-bar-line"
          style={{ width: `${progress()}%` }}
        ></div>
      </li>
    </ul>
  );
};

export default QuizCard;
