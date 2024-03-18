interface Props {
  id: number;
  active: boolean;
}

const PokemonScrollIcon = ({ id, active }: Props) => {
  const pokemon_image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

  return (
    <span className="flex items-center justify-center w-full">
      <img
        src={pokemon_image}
        alt={"scroll" + id}
        className={`h-[60px] w-[60px] mb-2 transition-all ${
          active ? "" : "group-hover:scale-110"
        }`}
      />
    </span>
  );
};

export default PokemonScrollIcon;
