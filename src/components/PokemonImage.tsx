import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  is_shiny: boolean;
}
const PokemonImage = ({ is_shiny }: Props) => {
  const { pokemonData } = usePokemonContext();

  let image_url;
  if (!is_shiny) image_url = pokemonData?.sprites.other?.home.front_default;
  else image_url = pokemonData?.sprites.other?.home.front_shiny;

  return (
    <div className="h-[300px] w-[300px] flex items-center justify-center bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain">
      <img
        src={image_url ? image_url : ""}
        alt={pokemonData?.name + ` ${is_shiny ? "Shiny" : "Normal"}`}
        className="h-[300px] w-[300px] drop-shadow-2xl transition-all"
      />
    </div>
  );
};

export default PokemonImage;
