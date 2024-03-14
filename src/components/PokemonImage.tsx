import { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  is_shiny: boolean;
}
const PokemonImage = ({ is_shiny }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const { pokemonData } = usePokemonContext();

  let image_url;
  if (!is_shiny) image_url = pokemonData?.sprites.other?.home.front_default;
  else image_url = pokemonData?.sprites.other?.home.front_shiny;

  useEffect(() => {
    const LoadedImage = new Image();
    LoadedImage.src = image_url ? image_url : "";
    LoadedImage.onload = () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="h-[300px] w-[300px] flex items-center justify-center bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain">
      {isLoading ? (
        <></>
      ) : (
        <img
          src={image_url ? image_url : ""}
          className="h-[300px] w-[300px] drop-shadow-2xl transition-all"
        />
      )}
    </div>
  );
};

export default PokemonImage;
