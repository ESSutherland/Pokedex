import { useEffect, useState } from "react";
import PokemonImage from "./PokemonImage";
import PokemonHeader from "./PokemonHeader";
import PokemonTypes from "./PokemonTypes";
import { usePokemonContext } from "../context/PokemonContext";
import PokemonInfo from "./PokemonInfo";
import PokemonShinyButton from "./PokemonShinyButton";
import PokemonCryButton from "./PokemonCryButton";
import PokemonFormBar from "./PokemonFormBar";
import PokemonFlavorText from "./PokemonFlavorText";

const PokemonMainContent = () => {
  const [isShiny, setIsShiny] = useState(false);
  const { isLoading, varietyIndex, pokemonId, currentForm, formIndex } =
    usePokemonContext();

  useEffect(() => {
    setIsShiny(false);
  }, [pokemonId, varietyIndex, formIndex]);

  const handleShinyClick = () => {
    setIsShiny((c) => !c);
  };

  const getFirstType = () => {
    return currentForm?.types[0].type.name || "normal";
  };

  return (
    <div className="flex w-full min-h-[700px] overflow-x-clip justify-center items-center xl:items-stretch flex-col xl:flex-row sm:mt-4 gap-2">
      {isLoading && (
        <div className="absolute top-0 left-0 w-screen h-full bg-black/30"></div>
      )}
      <div
        className="flex absolute w-[100rem] h-[100rem] rounded-full -top-[55rem] left-1/2 -translate-x-[28rem] -z-[1] items-center border-2 border-black/10 transition-all duration-300"
        style={{
          backgroundColor: `var(--${getFirstType()})`,
        }}
      >
        <div className="w-[90%] h-[90%] bg-white/40 dark:bg-black/40 rounded-full ml-3"></div>
      </div>
      {isLoading ? (
        <>
          <div className="absolute h-[300px] w-[300px] top-[148px] sm:top-[164px] xl:top-[223px] left-1/2 -translate-x-1/2 flex flex-col">
            <img
              src="pokeball_outline.png"
              className="h-[300px] w-[300px] animate-spin bg-white/90 dark:bg-black/90 rounded-full opacity-70"
            />
            <span className="text-center text-2xl font-bold mt-5 dark:text-slate-200">
              Loading...
            </span>
          </div>
        </>
      ) : (
        <>
          <PokemonFlavorText extraCss="hidden xl:flex" />
          <div className="flex flex-col w-full justify-between items-center">
            <PokemonHeader />
            <div className="h-full w-full flex flex-col items-center justify-between bg-white/50 dark:bg-black/50 sm:rounded-xl pt-5 mb-5 backdrop-blur-lg">
              <PokemonTypes />
              <div className="flex justify-center items-center">
                <PokemonImage is_shiny={isShiny} />
              </div>
              <div className="flex items-center justify-center gap-4">
                <PokemonShinyButton
                  handleShinyClick={handleShinyClick}
                  isShiny={isShiny}
                />
                <PokemonCryButton />
              </div>
            </div>
            <PokemonFormBar />
          </div>
          <PokemonFlavorText extraCss="xl:hidden flex" />
          <PokemonInfo />
        </>
      )}
    </div>
  );
};

export default PokemonMainContent;
