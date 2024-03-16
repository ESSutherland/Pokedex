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
    <div className={`w-full flex items-center justify-center ${extraCss}`}>
      {!isLoading && (
        <div className={`flex flex-col panel w-[400px] mx-10`}>
          <div className="title h-8"></div>
          <p className="text-xl font-bold px-5 py-8">
            {speciesData &&
              getEnglishFlavorText(speciesData?.flavor_text_entries)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonFlavorText;
