import { Questions, CorrectAnswerList } from "../database/Questions";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import PropTypes from 'prop-types'
import { GoXCircle, GoCheckCircle, GoSkip } from "react-icons/go";
const SummaryCard = (props) => {
  const {closeSummary} = props;
  const { numToChar } = useContext(QuestionContext);

  const quesTions = [
    {
      itemNumber: 1,
      question: "Which programming language is used for building Android apps?",
      choices: ["Java", "Swift", "Python", "C++"],
      correctAnswer: "A",
    },

    {
      itemNumber: 2,
      question: "What does HTML stand for?",
      choices: [
        "Hyper Text Markup Language",
        "High Technical Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: "A",
    },

    {
      itemNumber: 3,
      question:
        "Which protocol is used for secure data transmission over the internet?",
      choices: ["FTP", "HTTP", "SSH", "Telnet"],
      correctAnswer: "C",
    },

    {
      itemNumber: 4,
      question: "What does CPU stand for?",
      choices: [
        "Computer Processing Unit",
        "Central Processing Unit",
        "Core Processing Unit",
        "Control Processing Unit",
      ],
      correctAnswer: "B",
    },

    {
      itemNumber: 5,
      question:
        "Which of the following is a relational database management system?",
      choices: ["MongoDB", "MySQL", "Redis", "Cassandra"],
      correctAnswer: "B",
    },
  ];
  const myAnswers = ["A", "X", "C", "A", "D"];

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
        {quesTions.map((q, idx) => {
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
                    <span className={`answer-choices-span ${myAnswers[idx] === numToChar(idx2) ? "myAnswer": null}`} key={idx2}>
                      {numToChar(idx2)}.{c}
                    </span>
                  );
                })}
              </div>
              <div className="summary-remarks">
               <div className={`summary-remarks-wrapper ${summaryRemarks(q.correctAnswer, myAnswers[idx])}`}>
               {summaryRemarksIcon(q.correctAnswer, myAnswers[idx])}
                <p className="summary-correct-answer">
                  <span>
                    {`${summaryRemarks(q.correctAnswer, myAnswers[idx])}`}:
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