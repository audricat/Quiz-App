import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../database/Questions";
import { UserAUth } from "../context/UserContext";

import Swal from "sweetalert2";
const QuizCard = () => {
  const {
    progress,
    handleNext,
    handlePrevious,
    handleAnswers,
    numToChar,
    selectedAnswer,
    page,
  } = UserAUth();
  const { itemNumber, question, choices } = Questions[page];
  const navigate = useNavigate();
  const submitResponse = () => {
    // navigate to result page

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
