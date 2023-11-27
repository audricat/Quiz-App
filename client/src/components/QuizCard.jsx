import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Questions } from "../database/Questions";
import { UserAUth } from "../context/UserContext";

import { setLocal,getLocal,removeLocal } from "../helper/helper";
const QuizCard = () => {

  const { user } = UserAUth();
  const [page, setPage] = useState(0);
  const { itemNumber, question, choices } = Questions[page];
  const [answers, setAnswers] = useState(Array(Questions.length));
  const navigate = useNavigate();

  useEffect(()=>{
    const currentAnswers = getLocal("users_answers") 
    if(currentAnswers){
      setAnswers(currentAnswers)
      console.log(currentAnswers)
    }
  },[])

  useEffect(() => {
       if(answers.length > 0){
         setLocal("users_answers",answers)
       }
  });


  const progress = () => {
    return (itemNumber * 100) / Questions.length;
  };

  const numToChar = (num) => {
    const char = ["A", "B", "C", "D"];
    return num <= char.length ? char[num] : null;
  };

  const handleNext = () => {
    if (page !== Questions.length - 1) {
      setPage((page) => page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };
  
  const handleTraces = (choice) => {
    const newAnswers = answers.splice(itemNumber - 1, 1, choice);
    setAnswers((prev) => [...prev, newAnswers]);
    console.log(choice, answers);
  };

  const submitResponse = () => {
    // navigate to result page
    navigate("/score");
  };
  

 
  return (
    <div className="quiz-card">
      <ul>
        <li>
          <span>
            {itemNumber}/{Questions.length}
          </span>
        </li>
        <li>
          <div className="progress-bar">
            <div
              className="progress-bar-line"
              style={{ width: `${progress()}%` }}
            ></div>
          </div>
        </li>
        <li>
          <p>
            <span>{itemNumber}.</span> {question}
          </p>
        </li>
        <li>
          {choices.map((choice, idx) => {
            return (
              <div key={idx}>
                <button onClick={() => handleTraces(numToChar(idx))}>
                  {numToChar(idx)}.{choice}
                </button>
                {/* <label htmlFor={`choices${idx}`} >
                  <input type="radio" name="choices" id={`choices${idx}`} value={choice}
                  />
                </label> */}
              </div>
            );
          })}
        </li>
        <li>
          <button onClick={handlePrevious}>Previous</button>

          {itemNumber === Questions.length ? (
            <button onClick={submitResponse}>Submit</button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default QuizCard;
