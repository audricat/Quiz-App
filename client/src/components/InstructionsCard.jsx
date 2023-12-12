import PropTypes from "prop-types";

const InstructionsCard = (props) => {
  const { handleInstructions } = props;

  const instructions = [
    {
      id: 1,
      details: "Choose an answer from four options provided for each question.",
    },
    {
      id: 2,
      details:
        "Progress bar and question number are present for monitoring current progress.",
    },
    {
      id: 3,
      details:
        "Navigate through questions using the next and previous buttons.",
    },
    {
      id: 4,
      details: "Earn 1 point for every question you answer correctly.",
    },
    {
      id: 5,
      details:
        "Aim to achieve a passing score of 70% if you fall short, you can retake the quiz for another attempt.",
    },
    {
      id: 6,
      details: "Your score will be displayed immediately upon submission.",
    },
    {
      id: 7,
      details:
        "Manage background music throughout the quiz, turn on and off as desired.",
    },
  ];

  return (
   
      <ul className="instructions-card">
        <li id="instructions-title">
          <h2>INSTRUCTIONS</h2>
        </li>
        {instructions.map((item, idx) => {
          return (
            <li key={idx}>
              {item.id}. {item.details}
            </li>
          );
        })}
        <li id="instructions-navigation">
          <button className="global-button" onClick={handleInstructions}>
            <span className="global-button-span">OK</span>
          </button>
        </li>
      </ul>
  
  );
};

export default InstructionsCard;

InstructionsCard.propTypes = {
  handleInstructions: PropTypes.func,
};
