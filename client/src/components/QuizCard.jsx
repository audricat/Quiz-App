import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../database/Questions";
import { setLocal, getLocal } from "../helper/helper";
import Swal from "sweetalert2";
const QuizCard = () => {
  const [page, setPage] = useState(0);
  const { itemNumber, question, choices } = Questions[page];
  const [answers, setAnswers] = useState(Array(Questions.length));
  const navigate = useNavigate();

  useEffect(() => {
    const currentAnswers = getLocal("users_answers");
    if (currentAnswers) {
      setAnswers(currentAnswers);
      console.log(currentAnswers);
    }
  }, []);

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
    const newAnswers = answers.splice(itemNumber - 1, 1, choice);
    setAnswers((prev) => [...prev, newAnswers]);
    console.log(choice, answers);
  };

  useEffect(() => {
    if (answers[itemNumber] !== null) {
      console.log(answers[itemNumber]);
    }
  });

  const selectedAnswer =(idx)=>{
    return answers[itemNumber - 1] === numToChar(idx) ? true : false
  }

  const submitResponse = () => {
    // navigate to result page
    // navigate("/score", { replace: true });

    Swal.fire({
      title: "Are you sure you want to submit your quiz?",
      text: "Once submitted, you cannot make any changes.",
      showCancelButton: true,
      cancelButtonText: "CANCEL",
      cancelButtonColor: "var(--red-shade-1)",

      confirmButtonText: "SUBMIT",
      confirmButtonColor: "var(--orange-shade-3)",
      reverseButtons: true,
      allowOutsideClick: false
    }).then(function () {});
  };


  return (
    <ul className="quiz-card">
      <li className="quiz-questions">
        <div className="quiz-questions-wrapper">
          <p className="quiz-questions-text">
            <span >{itemNumber}.</span> {question}
          </p>
        </div>
      </li>
      <li className="quiz-choices">
      <div className="quiz-choices-wrapper">
        {choices.map((choice, idx) => {
          return (
            <button 
            className="quiz-buttons"
            id={selectedAnswer(idx) ? "button-choice" : null}
            key={idx} onClick={() => handleAnswers(numToChar(idx))}>
              <span 
               className="quiz-buttons-span"
               id={selectedAnswer(idx) ? "button-span-choice" : null}
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
            <span className="quiz-buttons-span" 
            id="button-span-navigation">
              PREV
            </span>
          </button>

          {itemNumber === Questions.length ? (
            <button
              className="quiz-buttons"
              id="button-submit"
              onClick={submitResponse}
            >
              <span className="quiz-buttons-span" 
              id="button-span-submit"
              >
                SUBMIT
              </span>
            </button>
          ) : (
            <button
              className="quiz-buttons"
              id="button-navigation"
              onClick={handleNext}
            >
              <span className="quiz-buttons-span" 
               id="button-span-navigation"
              >
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
