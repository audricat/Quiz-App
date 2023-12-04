import { useEffect, useState } from "react";
import { CorrectAnswerList, Questions } from "../database/Questions";
import { useNavigate } from "react-router-dom";
const ScoreCard = () => {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
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
    return score >= passingScore() ? "Congratulations." : "You failed.";
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
    <ul className="score-card">
      <li>
        <h2 id="page-title">RESULTS</h2>
      </li>
      <li>
        <ul className="scores">
          <li>YOUR POINTS</li>
          <li>{totalScore()}</li>
          <li>PASSING POINTS: {passingScore()}</li>
        </ul>
      </li>
      <li className="score-remarks">{remarks()}</li>
      <li className="score-message">{message()}</li>
      <li>
        <button className="landing-form-btn-submit" onClick={retake}>
          RETAKE
        </button>
      </li>
    </ul>
  );
};

export default ScoreCard;
