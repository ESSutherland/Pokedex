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
      className={`flex w-full max-w-[450px] xl:h-[80%] items-center justify-center mx-10 ${extraCss}`}
    >
      {!isLoading && (
        <div className={`flex flex-col panel xl:justify-start xl:h-full`}>
          <span className="title">Entry Data</span>
          <div className="text-xl flex items-center font-bold px-5 py-8 pt-1/2 h-full">
            {speciesData &&
              getEnglishFlavorText(speciesData?.flavor_text_entries)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonFlavorText;
