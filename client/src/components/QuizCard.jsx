import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../database/Questions";
import { setLocal, getLocal } from "../helper/helper";

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
  
  useEffect(()=>{
    if(answers[itemNumber] !== null) {
      console.log(answers[itemNumber])
    }
  })
  const submitResponse = () => {
    // navigate to result page
    navigate("/score", { replace: true });
  };
  
  const selectedAnswer ={
    background: "green"
  }
  return (
    <ul className="quiz-card">
      <li className="quiz-progress">
        <span className="quiz-items">
          {itemNumber}/{Questions.length}
        </span>
        <div className="progress-bar">
          <div
            className="progress-bar-line"
            style={{ width: `${progress()}%` }}
          ></div>
        </div>
      </li>
      <li className="quiz-questions">
        <div className="questions-wrapper">
          <p>
            <span>{itemNumber}.</span> {question}
          </p>
        </div>
      </li>
      <li className="quiz-choices">
        {choices.map((choice, idx) => {
          return (
            <button
              key={idx}
              className="quiz-button"
              id="btn-choices"
              style={answers[itemNumber - 1] === numToChar(idx) ? selectedAnswer: null}
              onClick={() => handleAnswers(numToChar(idx))}
            >
              <span className="quiz-button-value">
                {numToChar(idx)}.{choice}
              </span>
            </button>
          );
        })}
      </li>
      <li className="quiz-navigations">
        <div className="navigations-wrapper">
          <button
            className="quiz-button"
            id="btn-navigations"
            onClick={handlePrevious}
          >
            <span className="quiz-button-value" id="btn-value">
              PREV
            </span>
          </button>

          {itemNumber === Questions.length ? (
            <button
              className="quiz-button"
              id="btn-submit"
              onClick={submitResponse}
            >
              <span className="quiz-button-value" id="btn-submit-value">
                SUBMIT
              </span>
            </button>
          ) : (
            <button
              className="quiz-button"
              id="btn-navigations"
              onClick={handleNext}
            >
              <span className="quiz-button-value" id="btn-value">
                NEXT
              </span>
            </button>
          )}
        </div>
      </li>
    </ul>
  );
};

export default QuizCard;
