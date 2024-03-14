import PokemonScrollBar from "./components/PokemonScrollBar";
import PokemonMainContent from "./components/PokemonMainContent";
import PokemonContextProvider from "./context/PokemonContext";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

function App() {
  const [listActive, setListActive] = useState(false);
  return (
    <>
      <div className="flex mt-16 sm:mt-0 sm:flex-row justify-center w-full h-[1200px] overflow-x-hidden relative">
        <div>
          <PokemonContextProvider>
            <PokemonMainContent />
            <PokemonScrollBar active={listActive} />
          </PokemonContextProvider>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setListActive(!listActive)}
        className="absolute top-2 right-2 z-10 text-white h-12 w-12 flex items-center justify-center sm:hidden"
      >
        {listActive ? (
          <IoClose className="w-[90%] h-[90%]" />
        ) : (
          <IoMenu className="w-[90%] h-[90%]" />
        )}
      </button>
    </>
  );
}

export default App;
