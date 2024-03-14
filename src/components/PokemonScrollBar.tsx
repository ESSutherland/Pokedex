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
      className={`overflow-y-scroll z-10 fixed top-16 lg:top-20 right-0 lg:left-36 lg:max-h-[700px] w-[250px] lg:w-[350px] bg-slate-200 dark:bg-slate-900 gap-1 flex flex-col border-l-2 border-black/20 scrollbar xl:rtl shadow-2xl ${
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
