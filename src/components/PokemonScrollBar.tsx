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
      className={`overflow-y-scroll z-10 fixed top-16 lg:top-24 right-0 lg:left-40 lg:max-h-[700px] w-[250px] lg:w-[350px] bg-slate-200 dark:bg-slate-900 gap-1 flex flex-col items-center border-l-2 border-black/20 scrollbar lg:rtl shadow-2xl lg:rounded-md ${
        active ? "h-full" : "h-0"
      } transition-all`}
    >
      <React.Fragment>
        <div className="flex items-center ltr relative">
          <input
            className="text-left px-2 py-1 my-3 rounded-xl ltr outline-none dark:bg-slate-600 dark:text-white"
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            ref={ref}
          ></input>
          <IoCloseCircle
            className={`absolute right-2 text-lg dark:text-slate-200`}
            onClick={() => {
              setSearch("");
              if (ref.current) {
                (ref.current as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
        {pokemonList?.map((_pokemon, index) => {
          if (_pokemon.name.includes(search.toLowerCase()) || search === "")
            return <PokemonScrollPane id={index + 1} key={"scroll" + index} />;
        })}
      </React.Fragment>
    </div>
  );
};

export default PokemonScrollBar;
