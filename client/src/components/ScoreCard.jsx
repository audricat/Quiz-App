import { UserAUth } from "../context/UserContext";
import { CorrectAnswerList } from "../database/Questions";
const ScoreCard = () => {
  const { answers } = UserAUth();

  const setCorrectAnswer = (answers,correctAnswers) => {
    let sameIndexValue = [];
    answers.forEach((element, index) => {
      if (element === correctAnswers[index]) {
        sameIndexValue.push(element);
      }
    });
    return sameIndexValue.length;
  };

  return (
    <div className="score-card">
      <ul className="score-wrapper">
        <li>
          <h2>RESULTS</h2>
        </li>
        <li>
          <ul className="scores">
            <li>YOUR POINTS</li>
            <li>{setCorrectAnswer(answers,CorrectAnswerList())}</li>
            <li>PASSING POINTS: 35</li>
          </ul>
        </li>
        <li className="score-message-1">
          <span>Good Boy!</span>
        </li>

        <li>
          <button>RETAKE</button>
        </li>
      </ul>
    </div>
  );
};

export default ScoreCard;
