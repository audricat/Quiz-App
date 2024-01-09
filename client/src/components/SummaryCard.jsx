import { Questions, CorrectAnswerList } from "../database/Questions";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import PropTypes from 'prop-types'
import { GoXCircle, GoCheckCircle, GoSkip } from "react-icons/go";
const SummaryCard = (props) => {
  const {closeSummary} = props;
  const {answers, numToChar } = useContext(QuestionContext);

  

  const summaryRemarks = (correctAnswer, myAnswer) => {
    if (myAnswer === correctAnswer) {
      return "Correct";
    } else if (myAnswer !== correctAnswer && myAnswer !== "X") {
      return "Incorrect";
    } else {
      return "Skipped";
    }
  };

  const summaryRemarksIcon = (correctAnswer, myAnswer) => {
    if (myAnswer === correctAnswer) {
      return <GoCheckCircle className="summary-remarks-icon Correct" />;
    } else if (myAnswer !== correctAnswer && myAnswer !== "X") {
      return <GoXCircle className="summary-remarks-icon Incorrect" />;
    } else {
      return <GoSkip className="summary-remarks-icon Skipped" />;
    }
  };

  return (
    <div className="summary-card">
      <div className="summary-head">
        <button className="close-button" onClick={()=>closeSummary
        ()}>X</button>
      </div>
      <ul className="summary-body">
        {Questions.map((q, idx) => {
          return (
            <li className="summary-content" key={idx}>
              <div className="summary-question">
                <p>
                  {q.itemNumber}.{q.question}
                </p>
              </div>
              <div className="summary-choices">
                {q.choices.map((c, idx2) => {
                  return (
                    <span className={`answer-choices-span ${answers[idx] === numToChar(idx2) ? "myAnswer": null}`} key={idx2}>
                      {numToChar(idx2)}.{c}
                    </span>
                  );
                })}
              </div>
              <div className="summary-remarks">
               <div className={`summary-remarks-wrapper ${summaryRemarks(q.correctAnswer, answers[idx])}`}>
               {summaryRemarksIcon(q.correctAnswer, answers[idx])}
                <p className="summary-correct-answer">
                  <span>
                    {`${summaryRemarks(q.correctAnswer, answers[idx])}`}:
                  </span>
                  The correct answer is letter {q.correctAnswer}
                </p>
               </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes ={
  closeSummary: PropTypes.func,
}