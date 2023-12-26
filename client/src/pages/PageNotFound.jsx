import { useNavigate } from "react-router-dom";
import SummaryCard from "../components/SummaryCard";
import { useState } from "react";

const PageNotFound = () => {
  const navigate = useNavigate()
  const [toggleSummary,setToggleSummary] = useState(false)
  const handleGoBack = ()=>{
    navigate(-1)
  }

  const openSummary = ()=>{
    setToggleSummary(true)
  }
  const closeSummary = ()=>{
    setToggleSummary(false)
  }
  return (
    <div className="not-found-page-container">
      <span>Page Not Found</span>
      <button onClick={handleGoBack} >Go back </button>
      <button onClick={()=>openSummary()}>show summary</button>
      {toggleSummary ? <SummaryCard closeSummary={closeSummary}/> : null}
    </div>
  );
};

export default PageNotFound;
