import { usePokemonContext } from "../context/PokemonContext";

const PokemonBaseStats = () => {
  const { pokemonData } = usePokemonContext();

  return (
    <div>
      {pokemonData?.stats.map((stat) => {
        return <div>{stat.base_stat}</div>;
      })}
    </div>
  );
};

export default PokemonBaseStats;
