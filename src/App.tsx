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
import PokemonMoves from "./components/PokemonMoves";
function App() {
  const [listActive, setListActive] = useState(false);
  return (
    <>
      <nav className="bg-slate-200 dark:bg-slate-900 w-full h-16 fixed top-0 z-30 border-b border-black/80 dark:border-white/60">
        <button
          type="button"
          onClick={() => setListActive(!listActive)}
          className="absolute top-2 right-4 xl:left-4 z-10 dark:text-white h-12 w-12 flex items-center justify-center hover:scale-110 disabled:hover:scale-100 active:scale-95 transition-all"
        >
          {listActive ? (
            <IoClose className="w-[90%] h-[90%]" />
          ) : (
            <IoMenu className="w-[90%] h-[90%]" />
          )}
        </button>
      </nav>
      <main className="flex mt-16 justify-center w-full relative min-h-[1200px] overflow-hidden pb-10">
        <PokemonContextProvider>
          <div className="w-full h-full xl:mx-36 flex flex-col items-center">
            <PokemonMainContent />
            <PokemonScrollBar active={listActive} />
            <PokemonEvoChain />
            <div className="w-[95%] h-full flex flex-col xl:flex-row justify-center gap-4 mb-4">
              <PokemonBaseStats />
              <PokemonTypeEffects />
              <PokemonMiscData />
            </div>
            <PokemonMoves category="level-up" title="Level Up Moves" />
            <PokemonMoves category="machine" title="Machine Moves" />
            <PokemonMoves category="egg" title="Egg Moves" />

            <div className="fixed top-0 -z-10 w-full h-screen bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </PokemonContextProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
