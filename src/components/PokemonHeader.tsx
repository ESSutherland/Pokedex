import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePokemonContext } from "../context/PokemonContext";
import { useInView } from "react-intersection-observer";

const PokemonHeader = () => {
  const {
    pokemonId,
    speciesData,
    pokemonList,
    updatePokemon,
    updateVariety,
    updateForm,
    getEnglishName,
    pokemonGenus,
    isLoading,
  } = usePokemonContext();
  const { ref, inView } = useInView({
    threshold: 1,
    initialInView: true,
  });

  const max_id = pokemonList?.length || 0;

  const handlePrevButtonClick = () => {
    if (pokemonId > 1) {
      updatePokemon(pokemonId - 1);
      updateVariety(0);
      updateForm(0);
    }
  };

  const handleNextButtonClick = () => {
    if (pokemonId < max_id) {
      updatePokemon(pokemonId + 1);
      updateVariety(0);
      updateForm(0);
    }
  };

  return (
    <section
      className="flex justify-between w-full h-16 dark:text-slate-100 bg-white/50 dark:bg-black/50 mb-4 sm:rounded-2xl"
      ref={ref}
    >
      <button
        onClick={handlePrevButtonClick}
        disabled={pokemonId === 1}
        className="disabled:text-slate-500 dark:disabled:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 disabled:hover:cursor-not-allowed disabled:hover:text-slate-400 h-full flex justify-center items-center hover:scale-110 disabled:hover:scale-100 active:scale-95 transition-all"
      >
        <FontAwesomeIcon icon={faCaretLeft} className={"w-[50px] h-[50px]"} />
      </button>

      <h1 className="flex flex-col text-4xl font-bold text-center">
        {getEnglishName(speciesData?.names)}
        <span className="text-sm">
          #{pokemonId.toString().padStart(4, "0")} | {pokemonGenus}
        </span>
      </h1>

      <button
        onClick={handleNextButtonClick}
        disabled={pokemonId === max_id}
        className="disabled:text-slate-500 dark:disabled:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 disabled:hover:cursor-not-allowed disabled:hover:text-slate-400 h-full flex justify-center items-center hover:scale-110 disabled:hover:scale-100 active:scale-95 transition-all"
      >
        <FontAwesomeIcon icon={faCaretRight} className="w-[50px] h-[50px]" />
      </button>

      <h1
        className={`fixed top-0 left-1/2 -translate-x-1/2 flex flex-col text-4xl font-bold text-center z-30 transition-all origin-bottom scale-y-0 ${
          isLoading ? "" : inView ? "" : "scale-y-100"
        }`}
      >
        {getEnglishName(speciesData?.names)}
        <span className="text-sm">
          #{pokemonId.toString().padStart(4, "0")} | {pokemonGenus}
        </span>
      </h1>
    </section>
  );
};

export default PokemonHeader;
