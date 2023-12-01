import { createContext, useEffect, useState, useContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Questions } from "../database/Questions";
const UserContext = createContext({});

export function UserProvider({ children }) {
  const initState = {
    firstName: "",
    lastName: "",
    isLoggedIn: false,
  };
  const [user, setUser] = useState(initState);

  const [instructions, setInstructions] = useState(false);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(Questions.length));
  const { itemNumber } = Questions[page];

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem("bbqa_user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("bbqa_user"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, [setUser]);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/quiz", { replace: true });
    }
  }, [user, navigate]);

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

  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers === null || currentAnswers === undefined) {
      localStorage.setItem("users_answers", JSON.stringify(answers));
    }
  });
  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers) {
      setAnswers(currentAnswers);
    }
  }, [setAnswers]);

  const handleInstructions = () => {
    setInstructions(true);
  };

  const progress = () => {
    return (itemNumber * 100) / Questions.length;
  };

  const numToChar = (num) => {
    const char = ["A", "B", "C", "D"];
    return num <= char.length ? char[num] : null;
  };

  const handleNext = () => {
    if (page !== Questions.length - 1) {
      setPage((page) => page + 49);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  const handleAnswers = (choice) => {
    const oldAnswers = [...answers];
    oldAnswers.splice(itemNumber - 1, 1, choice);
    setAnswers(oldAnswers);
    localStorage.setItem("users_answers", JSON.stringify(oldAnswers));
  };

  const selectedAnswer = (idx) => {
    return answers[itemNumber - 1] === numToChar(idx) ? true : false;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        instructions,
        handleInstructions,
        progress,
        handleNext,
        handlePrevious,
        handleAnswers,
        numToChar,
        selectedAnswer,
        page,
        setPage,
        answers
      }}
    >
      {children}
      <Outlet />
    </UserContext.Provider>
  );
}

export function UserAUth() {
  return useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
