import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePokemonContext } from "../context/PokemonContext";

const PokemonHeader = () => {
  const { pokemonId, speciesData, pokemonList, updatePokemon, getEnglishName } =
    usePokemonContext();

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
        className="disabled:text-slate-400 disabled:hover:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faCaretLeft} className={"w-[50px] h-[50px]"} />
      </button>
      <div className="text-4xl font-bold leading-relaxed">
        {getEnglishName(speciesData?.names)}
      </div>
      <button
        onClick={handleNextButtonClick}
        disabled={pokemonId === max_id}
        className="disabled:text-slate-400"
      >
        <FontAwesomeIcon icon={faCaretRight} className="w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default PokemonHeader;
