import PokemonScrollBar from "./components/PokemonScrollBar";
import PokemonMainContent from "./components/PokemonMainContent";
import PokemonContextProvider from "./context/PokemonContext";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

function App() {
  const [listActive, setListActive] = useState(false);
  return (
    <>
      <div className="flex mt-16 lg:mt-0 sm:flex-row justify-center w-full h-[1200px] relative">
        <div className="w-full lg:mx-36 relative">
          <PokemonContextProvider>
            <PokemonMainContent />
            <PokemonScrollBar active={listActive} />
          </PokemonContextProvider>
          <div className="absolute top-0 -z-10 w-full h-full bg-slate-800"></div>
        </div>
        <div className="bg-slate-500 dark:bg-slate-900 w-full h-16 fixed top-0 lg:bg-slate-500 lg:w-[64px] lg:rounded-full lg:left-[146px] lg:top-[2px] shadow-xl">
          <button
            type="button"
            onClick={() => setListActive(!listActive)}
            className="absolute top-2 right-4 lg:left-2 z-10 text-white h-12 w-12 flex items-center justify-center"
          >
            {listActive ? (
              <IoClose className="w-[90%] h-[90%]" />
            ) : (
              <IoMenu className="w-[90%] h-[90%]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
