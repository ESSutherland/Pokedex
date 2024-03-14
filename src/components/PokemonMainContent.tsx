import { useContext, useEffect, useState } from "react";
import React from "react";
import PokemonImage from "./PokemonImage";
import PokemonHeader from "./PokemonHeader";
import PokemonTypes from "./PokemonTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { IoSparkles } from "react-icons/io5";
import { usePokemonContext } from "../context/PokemonContext";

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
    <div className="flex flex-col w-full h-[600px] items-center relative">
      <div
        className="flex absolute w-[100rem] h-[100rem] rounded-full -top-[55rem] left-1/2 -translate-x-[28rem] -z-10 items-center border-2 border-black/10 transition-all"
        style={{ backgroundColor: `var(--${getFirstType()})` }}
      >
        <div className="w-[90%] h-[90%] bg-black/40 rounded-full ml-3"></div>
      </div>
      {isLoading ? (
        <div className="bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain h-[300px] w-[300px] animate-spin duration-75 transition-all mt-32"></div>
      ) : (
        <React.Fragment>
          <PokemonHeader />
          <PokemonTypes />
          <div className="flex flex-1 justify-center">
            <PokemonImage is_shiny={isShiny} />
          </div>
          <button
            type="button"
            onClick={handleShinyClick}
            className="bg-slate-200 p-3 rounded-full mb-6 border-4 border-black/20 flex items-center justify-center"
          >
            <IoSparkles className="w-[25px] h-[25px] opacity-70" />
          </button>
          <div className="flex justify-between w-full text-slate-200 font-semibold text-xl bg-slate-700">
            <button
              type="button"
              onClick={handlePrevVarietyClick}
              disabled={varietyIndex === 0}
              className="disabled:text-slate-400"
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
              className="disabled:text-slate-400"
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PokemonMainContent;
