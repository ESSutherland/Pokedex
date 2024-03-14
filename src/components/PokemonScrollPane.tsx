import { usePokemonContext } from "../context/PokemonContext";
import PokemonScrollIcon from "./PokemonScrollIcon";

interface Props {
  id: number;
}
const PokemonScrollPane = ({ id }: Props) => {
  const { updatePokemon, pokemonId } = usePokemonContext();

  return (
    <div
      onClick={() => updatePokemon(id)}
      className={`flex first:mt-1 items-center w-full hover:cursor-pointer ${
        id == pokemonId
          ? "bg-slate-500 dark:bg-slate-800"
          : "bg-slate-300 dark:bg-slate-600"
      } transition-all`}
    >
      <PokemonScrollIcon id={id} />
      <div
        className={`font-bold text-2xl  h-full p-4 flex justify-center items-center bg-black/40 ${
          id === pokemonId ? " text-slate-300" : " text-slate-200"
        }`}
      >
        <p>#{id.toString().padStart(4, "0")}</p>
      </div>
    </div>
  );
};

export default PokemonScrollPane;
