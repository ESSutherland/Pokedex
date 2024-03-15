import { useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { usePokemonContext } from "../context/PokemonContext";

const PokemonCryButton = () => {
  const { pokemonData } = usePokemonContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    new Audio(
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData?.id}.ogg`
    )
  );

  const handleAudioClick = () => {
    audio.volume = 0.15;
    audio.play();
    setIsPlaying(true);
    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div
      className={`p-3 rounded-full mb-6 border-4 border-black/20 flex items-center justify-center hover:cursor-pointer ${
        isPlaying
          ? "bg-green-400"
          : "bg-slate-200 dark:bg-slate-600 dark:text-white"
      }`}
      onClick={() => handleAudioClick()}
    >
      <HiSpeakerWave className="w-[25px] h-[25px] opacity-70" />
    </div>
  );
};

export default PokemonCryButton;
