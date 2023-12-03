import QuizCard from "../components/QuizCard";
import InstructionsCard from "../components/InstructionsCard";
import { UserAUth } from "../context/UserContext";
import { useEffect } from "react";
const QuizPage = () => {
  const { instructions } = UserAUth();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      return "Changes that you made may not be saved.";
    };

    const handleUnload = (event) => {
      const storageName = ["bbqa_user", "users_answers", "instructions"];
      storageName.map((lsName) => localStorage.removeItem(lsName));
    };

    // In app component

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);
    };
  });

  return (
    <div className="quiz-page-container">
      {instructions ? <QuizCard /> : <InstructionsCard />}
    </div>
  );
};

export default QuizPage;
