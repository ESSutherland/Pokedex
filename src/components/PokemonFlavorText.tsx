import { FlavorText } from "pokenode-ts";
import { usePokemonContext } from "../context/PokemonContext";
import { useEffect, useState } from "react";
import { missing_data } from "../data";

interface Props {
  extraCss?: string;
}
const PokemonFlavorText = ({ extraCss }: Props) => {
  const { isLoading, speciesData } = usePokemonContext();
  const [flavorText, setFlavorText] = useState("");

  useEffect(() => {
    //account for missing flavor text in API
    let ft =
      (speciesData && getEnglishFlavorText(speciesData?.flavor_text_entries)) ||
      "";
    const getFlavorText = () => {
      Object.entries(missing_data).forEach(([id, text]) => {
        if (id === speciesData?.id.toString()) {
          ft = text;
          return;
        }
      });
    };
    getFlavorText();
    setFlavorText(ft);
  }, [speciesData]);

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
      className={`w-[95%] justify-center items-center max-w-[450px] mx-10 ${extraCss}`}
    >
      {!isLoading && (
        <div className={`flex flex-col panel xl:h-[80%] xl:mt-5`}>
          <span className="title">Entry Data</span>
          <div className="text-xl flex items-center font-bold px-5 py-8 pt-1/2 h-full">
            {flavorText}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonFlavorText;
