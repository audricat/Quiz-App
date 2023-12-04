import QuizCard from "../components/QuizCard";
import InstructionsCard from "../components/InstructionsCard";
import { useEffect, useState } from "react";

const QuizPage = () => {

  const [instructions, setInstructions] = useState(false);
 


  useEffect(() => {
    const handleBeforeUnload = () => {
      return "Changes that you made may not be saved.";
    };

    const handleUnload = () => {
      const storageName = [ "users_answers","bbqa_user" , "instructions"];
      for (let store of storageName) {
        localStorage.removeItem(store);
      }
    };

    // In app component

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload);
    };
  });

  useEffect(() => {
    if (instructions) {
      localStorage.setItem("instructions", JSON.stringify(instructions));
    }
  }, [instructions]);

  useEffect(() => {
    const visible = JSON.parse(localStorage.getItem("instructions"));
    if (visible) {
      setInstructions(visible);
    }
  }, [setInstructions]);



  const handleInstructions = () => {
    setInstructions(true);
  };




  return (
    <div className="quiz-page-container">
      {instructions ? <QuizCard /> : <InstructionsCard handleInstructions={handleInstructions}/>}
    </div>
  );
};

export default QuizPage;
