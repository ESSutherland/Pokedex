import PokemonScrollPane from "./PokemonScrollPane";
import { usePokemonContext } from "../context/PokemonContext";
import React from "react";

interface Props {
  active: boolean;
}
const PokemonScrollBar = ({ active }: Props) => {
  const { pokemonList } = usePokemonContext();
  return (
    <div
      className={`overflow-y-scroll absolute top-0 right-0 sm:left-0 sm:max-h-[700px] w-[250px] bg-slate-200 dark:bg-slate-900 gap-1 flex flex-col border-l-2 border-black scrollbar-none sm:scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-400 ${
        active ? "h-full" : "h-0 sm:h-full"
      } transition-all`}
    >
      <React.Fragment>
        {pokemonList?.map((_pokemon, index) => {
          return <PokemonScrollPane id={index + 1} key={"scroll" + index} />;
        })}
      </React.Fragment>
    </div>
  );
};

export default PokemonScrollBar;
