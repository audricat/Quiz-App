import PropTypes from "prop-types";
import { UserAUth } from "../context/UserContext";
const InstructionsCard = () => {
  const { handleInstructions } = UserAUth();

  const instructions = [
    {
      id: 1,
      details:
        "Pick the correct answer from four options provided for each question.",
    },
    {
      id: 2,
      details:
        "Progress bar and Question Number for monitoring current progress.",
    },
    {
      id: 3,
      details:
        "Click go back button to be redirected to the previous question.",
    },
    {
      id: 4,
      details: "Earn 1 points for every question you answer correctly.",
    },
    {
      id: 5,
      details:
        "Aim to achieve a passing score of 35 points if you fall short, you can retake the quiz for another attempt.",
    },
    {
      id: 6,
      details: "Your score will be displayed immediately upon submission.",
    },
  ];

  return (
    <div className="instructions-card">
     <div className="instructions-wrapper">
     <h2 id="instructions-title">INSTRUCTIONS</h2>
      <ul>
        {instructions.map((item, idx) => {
          return (
            <li key={idx}>
              {item.id}. {item.details}
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="landing-form-btn-submit"
        onClick={handleInstructions}
      >
        OK
      </button>
     </div>
    </div>
  );
};

export default InstructionsCard;

InstructionsCard.propTypes = {
  handleModal: PropTypes.func,
};
