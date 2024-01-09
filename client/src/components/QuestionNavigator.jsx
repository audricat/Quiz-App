import PropTypes from "prop-types";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
const QuestionNavigator = (props) => {
  const { handleToggleNavigator } = props;
  const { answers, handleJump } = useContext(QuestionContext);

  const myAnswers = ["A", "X", "C", "A", "D"];

  const questionStatus = (answer) => {
    const choices = ["A", "B", "C", "D"];
    if (choices.includes(answer)) {
      return "Answered";
    } else if (answer === "X") {
      return "Skipped";
    } else if (answer === "Y") {
      return "Flagged";
    } else {
      return "Default";
    }
  };

  const handleJumpToPage =(idx)=>{
    handleJump(idx)
    handleToggleNavigator()
  }
  return (
    <div className="question-navigator">
      <ul className="question-navigator-wrapper">
        <li className="navigator-header">
          <div className="navigation-legend-wrapper">
            <span>Question Navigator</span>
            <span>Legend:</span>
            <div className="navigation-legend">
              <button>
                <span>Answered</span>
              </button>
              <button>
                <span>Skipped</span>
              </button>
              <button>
                <span>Flagged</span>
              </button>
            </div>
          </div>
        </li>
        <li className="navigator-center">
          <ul className="number-grid">
            {answers.map((answer, idx) => {
              return (
                <li key={idx} className="number-grid-wrapper">
                  <button
                    className="number-grid-button"
                     id={`${questionStatus(answer)}`}
                    onClick={()=>handleJumpToPage(idx)}
                  >
                    {idx + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="navigator-footer">
          <button onClick={handleToggleNavigator} className="medium-button">
            <span className="medium-span">BACK</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default QuestionNavigator;

QuestionNavigator.propTypes = {
  handleToggleNavigator: PropTypes.func,
};
