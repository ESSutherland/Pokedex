import PokemonScrollBar from "./components/PokemonScrollBar";
import PokemonMainContent from "./components/PokemonMainContent";
import PokemonContextProvider from "./context/PokemonContext";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import PokemonEvoChain from "./components/PokemonEvoChain";
import PokemonBaseStats from "./components/PokemonBaseStats";
import PokemonTypeEffects from "./components/PokemonTypeEffects";
import Footer from "./components/Footer";
import PokemonMiscData from "./components/PokemonMiscData";

function App() {
  const [listActive, setListActive] = useState(false);
  return (
    <>
      <div className="flex mt-16 justify-center w-full relative min-h-[1200px] overflow-hidden pb-10">
        <div className="w-full xl:mx-36 relative flex flex-col items-center">
          <PokemonContextProvider>
            <PokemonMainContent />
            <PokemonScrollBar active={listActive} />
            <PokemonEvoChain />
            <div className="w-[95%] flex flex-col xl:flex-row justify-center items-center gap-4">
              <PokemonBaseStats />
              <PokemonTypeEffects />
              <PokemonMiscData />
            </div>
          </PokemonContextProvider>
          <div className="absolute top-0 -z-10 w-full h-[5000px] bg-slate-300 dark:bg-slate-800"></div>
        </div>
        <div className="bg-slate-400 dark:bg-slate-900 w-full h-16 fixed top-0">
          <button
            type="button"
            onClick={() => setListActive(!listActive)}
            className="absolute top-2 right-4 xl:left-40 z-10 text-white h-12 w-12 flex items-center justify-center"
          >
            {listActive ? (
              <IoClose className="w-[90%] h-[90%]" />
            ) : (
              <IoMenu className="w-[90%] h-[90%]" />
            )}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
