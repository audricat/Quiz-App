import QuizCard from "../components/QuizCard";
import InstructionsCard from "../components/InstructionsCard";
import { UserAUth } from "../context/UserContext";
const QuizPage = () => {
   const {instructions} = UserAUth()
  return (
    <div className="quiz-page-container">
     { instructions ?  <QuizCard />  :  <InstructionsCard  />}
    </div>
  );
};

export default QuizPage;
