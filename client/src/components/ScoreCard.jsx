import { useEffect, useState } from "react";
import { CorrectAnswerList, Questions } from "../database/Questions";
import { useNavigate } from "react-router-dom";
import { UserAUth } from "../context/UserContext";
const ScoreCard = () => {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const {user} = UserAUth()
  useEffect(() => {
    const handleBeforeUnload = () => {
      return "Changes that you made may not be saved.";
    };

    const handleUnload = () => {
      const storageName = ["users_answers", "bbqa_user", "instructions"];
      for (let store of storageName) {
        localStorage.removeItem(store);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);
    };
  });

  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers) {
      setAnswers(currentAnswers);
    }
  }, [setAnswers]);

  const totalScore = () => {
    const correctAnswers = CorrectAnswerList();
    let sameIndexValue = [];
    answers.forEach((element, index) => {
      if (element === correctAnswers[index]) {
        sameIndexValue.push(element);
      }
    });
    return sameIndexValue.length;
  };

  const passingScore = () => {
    let passingPercentage = 70;
    let deno = 100;
    let passing = (passingPercentage / deno) * Questions.length;
    return Math.round(passing);
  };

  const remarks = () => {
    const score = totalScore();
    return score >= passingScore() ? true : false;
  };

  const message = () => {
    const score = totalScore();
    if (score >= passingScore() && score <= Questions.length) {
      return "You've Passed the Quiz!";
    } else if (score > 20 && score < passingScore()) {
      return "But good effort, keep it up.";
    } else {
      return "You can retake the quiz and improve!";
    }
  };

  const retake = () => {
    const storageName = ["bbqa_user", "users_answers", "instructions"];
    storageName.map((lsName) => localStorage.removeItem(lsName));
    if (storageName) {
      navigate("/", { replace: true });
    }
  };

  return (
    <ul className="score-card-wrapper">
      <li id="score-title">
        <h1>RESULTS</h1>
      </li>

      <li id="overall-score">
        <ul id="overall-score-wrapper">
          <li>
            <h2>{user.firstName} { user.lastName} SCORE:</h2>
          </li>
          <li>
            <h2 id="total-points">{totalScore()}</h2>
          </li>
          <li>
            <span>Passing Points: {passingScore()}</span>
          </li>
        </ul>
      </li>

      <li id="score-remarks">
        <span id={remarks() ? "passed-remarks" : "failed-remarks"}>
          {" "}
          {remarks() ? "Congratulation!" : "You failed."}
        </span>
        <span>{message()}</span>
      </li>

      <li id="score-navigation">
        <button
          className="global-button"
          id="score-submit-button"
          onClick={retake}
        >
          <span className="global-button-span">RETAKE</span>
        </button>
      </li>
    </ul>
  );
};

export default ScoreCard;
