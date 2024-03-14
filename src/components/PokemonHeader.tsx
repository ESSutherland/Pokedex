import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePokemonContext } from "../context/PokemonContext";

const PokemonHeader = () => {
  const {
    pokemonId,
    speciesData,
    pokemonList,
    updatePokemon,
    getEnglishName,
    pokemonGenus,
  } = usePokemonContext();

  const max_id = pokemonList?.length || 0;

  const handlePrevButtonClick = () => {
    if (pokemonId > 1) {
      updatePokemon(pokemonId - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (pokemonId < max_id) {
      updatePokemon(pokemonId + 1);
    }
  };

  return (
    <div className="flex justify-between w-full h-16 text-slate-100 bg-black/10 mb-4">
      <button
        onClick={handlePrevButtonClick}
        disabled={pokemonId === 1}
        className="disabled:text-slate-400 hover:text-slate-300 disabled:hover:cursor-not-allowed disabled:hover:text-slate-400"
      >
        <FontAwesomeIcon icon={faCaretLeft} className={"w-[50px] h-[50px]"} />
      </button>
      <div className="flex flex-col text-4xl font-bold text-center">
        {getEnglishName(speciesData?.names)}{" "}
        <span className="text-sm">
          #{pokemonId.toString().padStart(4, "0")} | {pokemonGenus}
        </span>
      </div>
      <button
        onClick={handleNextButtonClick}
        disabled={pokemonId === max_id}
        className="disabled:text-slate-400 hover:text-slate-300 disabled:hover:cursor-not-allowed disabled:hover:text-slate-400"
      >
        <FontAwesomeIcon icon={faCaretRight} className="w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default PokemonHeader;
