import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserAUth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LandingForm = () => {
  const { setUser } = UserAUth();

  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });

  const validation = yup.object().shape({
    fName: yup
      .string()
      .typeError("Please enter your First Name.")
      .required("First Name is required.")
      .min(1, "First Name must be atleast 1 character.")
      .max(50, "First Name must be no longer than 50 characters."),
    lName: yup
      .string()
      .typeError("Please enter your Last Name.")
      .required("Last Name is required.")
      .min(1, "Last Name must be atleast 1 character.")
      .max(50, "Last Name must be no longer than 50 characters."),
  });

  const {
    register,
    handleSubmit,

    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
  });

  const onChangeName = (e) => {
    var targetName = e.target.name;
    var targetValue = e.target.value;
    const textRegex = /[^a-z, ]/gi;

    if (targetValue.startsWith(" ")) {
      return null;
    } else {
      targetValue = targetValue.replace(textRegex, "").toUpperCase();
    }

    setFullName((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onSubmitForm = () => {
    setUser((prev) => ({
      ...prev,
      firstName: fullName.fName,
      lastName: fullName.lName,
      isLoggedIn: true,
    }));
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="landing-form">
      <ul className="landing-card">
        <li>
          <span className="landing-form-input-label">FIRST NAME</span>
          <input
            type="text"
            inputMode="text"
            name="fName"
            className="landing-form-input-text"
            value={fullName.fName}
            placeholder="ENTER YOUR FIRST NAME"
            autoComplete="off"
            minLength={1}
            maxLength={50}
            {...register("fName", {
              onChange: onChangeName,
            })}
          />
          <small className="landing-form-error-msg">
            {errors.fName?.message}
          </small>
        </li>

        <li>
          <span className="landing-form-input-label">LAST NAME</span>
          <input
            type="text"
            inputMode="text"
            name="lName"
            className="landing-form-input-text"
            value={fullName.lName}
            placeholder="ENTER YOUR LAST NAME"
            autoComplete="off"
            minLength={1}
            maxLength={50}
            {...register("lName", {
              onChange: onChangeName,
            })}
          />
          <small className="landing-form-error-msg">
            {errors.lName?.message } 
          </small>
        </li>
        <li>
          <button
            type="submit"
            className="landing-form-btn-submit"
            disabled={!isDirty || !isValid}
          >
            START QUIZ
          </button>
        </li>
      </ul>
    </form>
  );
};

export default LandingForm;
