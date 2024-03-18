import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  is_shiny: boolean;
}
const PokemonImage = ({ is_shiny }: Props) => {
  const { pokemonData, currentForm, pokemonId } = usePokemonContext();

  const formPokemon = [
    493, 585, 586, 201, 412, 421, 422, 423, 649, 666, 669, 670, 671, 676, 716,
    773, 869,
  ];

  let image_url;
  if (!is_shiny) image_url = pokemonData?.sprites.other?.home.front_default;
  else image_url = pokemonData?.sprites.other?.home.front_shiny;

  if (
    formPokemon.includes(pokemonId) &&
    currentForm &&
    currentForm?.form_name.length > 0 &&
    currentForm?.form_name !== "normal"
  ) {
    let formName = currentForm?.form_name;
    if (pokemonId === 869) formName += "-strawberry-sweet";
    if (!is_shiny)
      image_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData?.id}-${formName}.png`;
    else
      image_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonData?.id}-${formName}.png`;
  }

  return (
    <div className="h-[300px] w-[300px] flex items-center justify-center bg-center bg-no-repeat bg-contain relative">
      <img
        src="pokeball_outline.png"
        className="absolute bg-white/90 dark:bg-black/90 rounded-full opacity-70"
      />
      <img
        src={image_url ? image_url : ""}
        alt={pokemonData?.name + ` ${is_shiny ? "Shiny" : "Normal"}`}
        className="h-[300px] w-[300px] drop-shadow-2xl transition-all"
      />
    </div>
  );
};

export default PokemonImage;
