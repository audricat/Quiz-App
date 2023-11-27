import LogoWithTitle from "../assets/LogoWithTitle.png";
const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-wrapper">
        <span className="banner-greetings">WELCOME TO</span>
        <img src={LogoWithTitle} alt="logowithtitle" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
