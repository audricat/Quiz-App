import { useContext } from "react";

import MusicOn from "../assets/MusicOn.png";
import MusicOff from "../assets/MusicOff.png";
import SoundContext from "../context/SoundContext";

const Music = () => {
  const { isPlaying, playSound, pauseSound } = useContext(SoundContext);

  return (
    <div className="music-container">
      {isPlaying ? (
        <button onClick={() => pauseSound()} className="music-btn">
          <img src={MusicOn} alt="music-on-img" className="music-btn-img" />
        </button>
      ) : (
        <button onClick={() => playSound()} className="music-btn">
          <img src={MusicOff} alt="music-off-img" className="music-btn-img" />
        </button>
      )}
    </div>
  );
};

export default Music;
