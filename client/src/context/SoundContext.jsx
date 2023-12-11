import { createContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const SoundContext = createContext({});

export function SoundProvider({ children }) {
  const musicLink = "https://dl.sndup.net/mtks/bgm.mp3"
   
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
    <SoundContext.Provider value={{isPlaying,playSound,pauseSound}}>
      {children}
      <Outlet />
    </SoundContext.Provider>
  );
}

export default SoundContext;

SoundProvider.propTypes = {
  children: PropTypes.node,
};
