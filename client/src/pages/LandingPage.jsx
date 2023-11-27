import LandingForm from "../components/LandingForm";
import Instructions from "../components/Instructions";
import { UserAUth } from "../context/UserContext";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Banner from "../components/Banner";
import { removeLocal } from "../helper/helper";
const LandingPage = () => {
  const { user } = UserAUth();
  const navigate = useNavigate();

 

  return (
    <div className="landing-page-container">
      <Banner />
      <LandingForm />
    </div>
  );
};

export default LandingPage;
