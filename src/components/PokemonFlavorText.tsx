import { FlavorText } from "pokenode-ts";
import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  extraCss?: string;
}
const PokemonFlavorText = ({ extraCss }: Props) => {
  const { isLoading, speciesData } = usePokemonContext();

  const getEnglishFlavorText = (flavorTextEntries: FlavorText[]) => {
    let englishText = "No Data Found";
    flavorTextEntries?.forEach((entry) => {
      if (entry.language.name === "en") {
        englishText = entry.flavor_text;
      }
    });
    return englishText;
  };

  return (
    <div
      className={`flex flex-col w-[400px] bg-slate-200 dark:bg-slate-600 items-center text-center dark:text-white mx-10 rounded-xl overflow-hidden shadow-2xl ${extraCss}`}
    >
      {!isLoading && (
        <>
          <div className="w-full h-8 py-1 bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase"></div>
          <p className="text-xl font-bold px-5 py-8">
            {speciesData &&
              getEnglishFlavorText(speciesData?.flavor_text_entries)}
          </p>
        </>
      )}
    </div>
  );
};

export default PokemonFlavorText;
