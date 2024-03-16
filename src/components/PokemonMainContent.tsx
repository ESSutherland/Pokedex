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
    <div className="flex w-full min-h-[680px] overflow-x-clip relative items-center justify-center flex-col xl:flex-row sm:mt-4 gap-2">
      <div
        className="flex absolute w-[100rem] h-[100rem] rounded-full -top-[55rem] left-1/2 -translate-x-[28rem] -z-[1] items-center border-2 border-black/10 transition-all"
        style={{
          backgroundColor: `var(--${getFirstType()})`,
        }}
      >
        <div className="w-[90%] h-[90%] bg-black/40 rounded-full ml-3"></div>
      </div>
      {isLoading ? (
        <div className="absolute top-32 xl:top-[199px] left-1/2 -translate-x-1/2">
          <div className="h-[300px] w-[300px] bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain animate-spin"></div>
        </div>
      ) : (
        <>
          <PokemonFlavorText extraCss="hidden xl:block" />
          <div className="flex flex-col w-full h-full justify-between items-center">
            <PokemonHeader />
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
            <PokemonFormBar />
          </div>
          <PokemonFlavorText extraCss="xl:hidden block" />
          <PokemonInfo />
        </>
      )}
    </div>
  );
};

export default PokemonMainContent;
