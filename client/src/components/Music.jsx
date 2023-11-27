import { useState, useRef } from "react";

import MusicOn from "../assets/MusicOn.png";
import MusicOff from "../assets/MusicOff.png";

const Music = () => {
  //const musicLink ="https://drive.google.com/uc?export=download&id=1OM6rQ15cmQ4vZ0iL1lWVsXKHvkbb_cIs"

  const musicLink =
    "https://drive.google.com/uc?export=download&id=1qhHbZGF3GxVeASxESNvqMEW_UqD6oG1S";
  const musicRef = useRef(new Audio(musicLink)).current;
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    musicRef.play();
    musicRef.loop = true;
    musicRef.volume = 0.35;
    setIsPlaying(true);
  };

  const pauseSound = () => {
    musicRef.pause();
    setIsPlaying(false);
  };
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
