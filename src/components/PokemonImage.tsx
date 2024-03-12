import { Pokemon } from "pokenode-ts";
import { MouseEvent, useEffect, useState } from "react";

interface Props {
  pokemon: Pokemon | undefined;
  is_shiny: boolean;
}
const PokemonImage = ({ pokemon, is_shiny }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const loading =
    "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif";

  let image_url;
  if (!is_shiny) image_url = pokemon?.sprites.other?.home.front_default;
  else image_url = pokemon?.sprites.other?.home.front_shiny;

  useEffect(() => {
    const LoadedImage = new Image();
    LoadedImage.src = image_url ? image_url : "";
    LoadedImage.onload = () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="h-[300px] w-[300px] flex items-center justify-center">
      {isLoading ? (
        <img src={loading} className="w-[50%] h-[50%]" />
      ) : (
        <img src={image_url ? image_url : ""} className="h-[300px] w-[300px]" />
      )}
    </div>
  );
};

export default PokemonImage;
