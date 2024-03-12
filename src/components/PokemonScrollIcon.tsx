interface Props {
  id: number;
}

const PokemonScrollIcon = ({ id }: Props) => {
  const pokemon_image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  return (
    <div className="w-[100px] h-[100px]">
      <img src={pokemon_image} alt={"scroll" + id} />
    </div>
  );
};

export default PokemonScrollIcon;
