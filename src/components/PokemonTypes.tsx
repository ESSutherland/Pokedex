import { usePokemonContext } from "../context/PokemonContext";

const PokemonTypes = () => {
  const { pokemonData } = usePokemonContext();

  return (
    <div className="flex gap-4 capitalize text-xl font-semibold mb-4">
      {pokemonData?.types.map((type, index) => {
        return (
          <div
            key={index}
            className="w-[120px] flex items-center rounded-md border-2 border-black/50 text-white overflow-hidden"
            style={{ backgroundColor: `var(--${type.type.name})` }}
          >
            <img
              src={`icons/${type.type.name}.svg`}
              alt={type.type.name}
              className="w-5 h-5 mx-1"
            />
            <div className=" bg-black/30 w-full flex items-center justify-center">
              {type.type.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonTypes;
