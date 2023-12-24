import { useContext } from "react";
import QuestionContext from "../context/QuestionContext";

const QuizCard = () => {
  const {
    itemNumber,
    itemCount,
    question,
    choices,
    handleAnswers,
    selectedAnswer,
    numToChar,
    handlePrevious,
    submitResponse,
    handleNext,
    progress,
  } = useContext(QuestionContext);

  return (
    <ul className="quiz-card">
      <li>
        <div id="item-count-wrapper">
          <span>Question</span>
          <span>
            {itemNumber}/{itemCount}
          </span>
        </div>
      </li>
      <li id="progress-bar">
        <div id="progress-bar-wrapper">
          <div id="progress-line" style={{ width: `${progress()}%` }}></div>
        </div>
      </li>

      <li id="questions">
        <div id="questions-wrapper">
          <p id="question-text">
            <span>{itemNumber}.</span> {question}
          </p>
        </div>
      </li>

      <li id="answer-choices">
        <div id="answer-choices-wrapper">
          {choices.map((choice, idx) => {
            return (
              <button
                className="quiz-button"
                onClick={() => handleAnswers(numToChar(idx))}
                key={idx}
                id={selectedAnswer(idx) ? "button-selected" : "button-unselected"}
              >
                <span
                  className="quiz-span"
                  id={selectedAnswer(idx) ? "span-selected" : "span-unselected"}
                >
                  {numToChar(idx)}.{choice}
                </span>
              </button>
            );
          })}
        </div>
      </li>

      <li id="quiz-navigation">
        <div id="quiz-navigation-wrapper">
          <button
            className="quiz-button"
            id="button-navigate"
            onClick={handlePrevious}
            disabled={itemNumber === 1 }
          >
            <span className="quiz-span" >PREVIOUS</span>
          </button>

          {itemNumber === itemCount ? (
            <button
              className="quiz-button"
              id="button-submit"
              onClick={submitResponse}
            >
              <span className="quiz-span">SUBMIT</span>
            </button>
          ) : (
            <button
              className="quiz-button"
              id="button-navigate"
              onClick={handleNext}
            >
              <span className="quiz-span">NEXT</span>
            </button>
          )}

        
        </div>
      </li>
    </ul>
  );
};

export default QuizCard;
