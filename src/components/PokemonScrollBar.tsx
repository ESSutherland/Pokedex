import PokemonScrollPane from "./PokemonScrollPane";
import { usePokemonContext } from "../context/PokemonContext";
import React, { useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";

interface Props {
  active: boolean;
}
const PokemonScrollBar = ({ active }: Props) => {
  const { pokemonList } = usePokemonContext();
  const [search, setSearch] = React.useState("");
  const ref = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div
      className={`fixed lg:max-h-screen w-[250px] lg:w-[450px] z-10 top-16 right-0 lg:left-0 overflow-hidden ${
        active ? "h-full" : "h-0 border-0 overflow-hidden"
      } transition-all`}
    >
      <React.Fragment>
        <div className="flex justify-center items-center absolute top-0 w-full lg:ml-2 bg-slate-200 dark:bg-slate-900 -translate-y-[1px]">
          <input
            className="text-left px-2 py-1 my-3 mx-10 rounded-xl ltr outline-none w-full max-w-[300px] dark:bg-slate-600 dark:text-white"
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            ref={ref}
          ></input>
          <IoCloseCircle
            className={`absolute right-12 lg:right-20 text-lg dark:text-slate-200`}
            onClick={() => {
              setSearch("");
              if (ref.current) {
                (ref.current as HTMLInputElement).value = "";
              }
            }}
          />
        </div>

        <ul
          className={`bg-slate-200 dark:bg-slate-900 gap-1 flex flex-col items-center border-black/20 scrollbar lg:rtl shadow-2xl lg:rounded-md pt-[60px] overflow-y-scroll w-full h-full transition-all`}
        >
          {pokemonList?.map((_pokemon, index) => {
            if (
              _pokemon.name.includes(search.toLowerCase()) ||
              (index + 1).toString().startsWith(search) ||
              search === ""
            )
              return (
                <PokemonScrollPane id={index + 1} key={"scroll" + index} />
              );
          })}
        </ul>
      </React.Fragment>
    </div>
  );
};

export default PokemonScrollBar;
