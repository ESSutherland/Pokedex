import { usePokemonContext } from "../context/PokemonContext";
import PokemonScrollIcon from "./PokemonScrollIcon";

interface Props {
  id: number;
}
const PokemonScrollPane = ({ id }: Props) => {
  const { updatePokemon, updateForm, updateVariety, pokemonId } =
    usePokemonContext();

  return (
    <li
      onClick={() => {
        updatePokemon(id);
        updateVariety(0);
        updateForm(0);
      }}
      className={`group flex items-center justify-center w-[95%] hover:cursor-pointer rounded-md border-2 border-black/20 last:mb-20 ${
        id == pokemonId
          ? "bg-slate-500 dark:bg-slate-600"
          : "bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700"
      } transition-all`}
    >
      <PokemonScrollIcon id={id} active={id === pokemonId} />
      <span
        className={`font-bold text-2xl  h-full p-4 flex justify-center items-center bg-black/40 rounded-s-md ${
          id === pokemonId ? " text-slate-300" : " text-slate-200"
        }`}
      >
        <p>#{id.toString().padStart(4, "0")}</p>
      </span>
    </li>
  );
};

export default PokemonScrollPane;
