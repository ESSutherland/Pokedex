import { IoSparkles } from "react-icons/io5";
import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  handleShinyClick: () => void;
  isShiny: boolean;
}
const PokemonShinyButton = ({ handleShinyClick, isShiny }: Props) => {
  const { pokemonData } = usePokemonContext();
  return (
    <>
      {pokemonData?.sprites.other?.home.front_shiny ? (
        <button
          type="button"
          onClick={handleShinyClick}
          className={`p-3 rounded-full mb-6 border-4 border-black/20 flex items-center justify-center ${
            isShiny
              ? "bg-yellow-400"
              : "bg-slate-200 dark:bg-slate-600 dark:text-white"
          }`}
        >
          <IoSparkles className="w-[25px] h-[25px] opacity-70" />
        </button>
      ) : null}
    </>
  );
};

export default PokemonShinyButton;
