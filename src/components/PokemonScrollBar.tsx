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
      className={`overflow-y-scroll fixed top-16 right-0 sm:left-0 sm:max-h-[700px] w-[250px] sm:w-[350px] bg-slate-200 dark:bg-slate-900 gap-1 flex flex-col border-l-2 border-black scrollbar xl:rtl ${
        active ? "h-full" : "h-0"
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
