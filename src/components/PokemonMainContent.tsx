import { useEffect, useState } from "react";
import PokemonImage from "./PokemonImage";
import PokemonHeader from "./PokemonHeader";
import PokemonTypes from "./PokemonTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePokemonContext } from "../context/PokemonContext";
import PokemonInfo from "./PokemonInfo";
import PokemonShinyButton from "./PokemonShinyButton";

const PokemonMainContent = () => {
  const [isShiny, setIsShiny] = useState(false);
  const {
    isLoading,
    varietyIndex,
    updateVariety,
    pokemonId,
    getEnglishName,
    pokemonData,
    speciesData,
    varietiesList,
    formsList,
  } = usePokemonContext();

  useEffect(() => {
    setIsShiny(false);
  }, [pokemonId, varietyIndex]);

  const handleShinyClick = () => {
    setIsShiny((c) => !c);
  };

  const handlePrevVarietyClick = () => {
    if (varietyIndex !== 0) updateVariety(varietyIndex - 1);
  };

  const handleNextVarietyClick = () => {
    if (varietiesList && varietyIndex < varietiesList?.length)
      updateVariety(varietyIndex + 1);
  };

  const getFormName = () => {
    const formName =
      varietiesList && formsList && varietiesList?.length > 1
        ? formsList[0].form_names.length > 0
          ? getEnglishName(formsList[0].names) +
            ` (Form ${varietyIndex + 1} of ${varietiesList?.length})`
          : getEnglishName(speciesData?.names) +
            ` (Form ${varietyIndex + 1} of ${varietiesList?.length})`
        : "No Forms";

    return formName;
  };

  const getFirstType = () => {
    return pokemonData?.types[0].type.name || "normal";
  };

  return (
    <div className=" flex justify-center w-full h-[600px] overflow-x-clip relative sm:mt-4">
      <div
        className="flex absolute w-[100rem] h-[100rem] rounded-full -top-[55rem] left-1/2 -translate-x-[28rem] -z-[1] items-center border-2 border-black/10 transition-all"
        style={{
          backgroundColor: `var(--${getFirstType()})`,
        }}
      >
        <div className="w-[90%] h-[90%] bg-black/40 rounded-full ml-3 "></div>
      </div>
      {isLoading ? (
        <div className="h-[300px] w-[300px] bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain animate-spin mt-32"></div>
      ) : (
        <div className="flex flex-col w-full max-w-[600px] h-[600px] items-center relative">
          <PokemonHeader />
          <PokemonTypes />
          <div className="flex flex-1 justify-center">
            <PokemonImage is_shiny={isShiny} />
          </div>
          <PokemonShinyButton
            handleShinyClick={handleShinyClick}
            isShiny={isShiny}
          />
          <div className="flex justify-between items-center w-full text-slate-200 font-semibold text-xl bg-black/50 sm:rounded-lg">
            <button
              type="button"
              onClick={handlePrevVarietyClick}
              disabled={varietyIndex === 0}
              className="disabled:text-slate-400 flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faCaretLeft}
                className={"w-[30px] h-[30px]"}
              />
            </button>
            <div className="w-[350px] text-center">{getFormName()}</div>
            <button
              type="button"
              onClick={handleNextVarietyClick}
              disabled={
                varietiesList && varietyIndex === varietiesList?.length - 1
              }
              className="disabled:text-slate-400 flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>
        </div>
      )}
      <PokemonInfo />
    </div>
  );
};

export default PokemonMainContent;