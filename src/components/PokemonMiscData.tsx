import { usePokemonContext } from "../context/PokemonContext";

const PokemonMiscData = () => {
  const { speciesData, isLoading, pokemonGrowthRate } = usePokemonContext();

  const getExperience = () => {
    let exp = 0;
    pokemonGrowthRate?.levels.forEach((expGroup) => {
      if (expGroup.level === 100) exp = expGroup.experience;
    });
    return exp;
  };

  return (
    !isLoading && (
      <div className="w-full xl:w-fit 2xl:min-w-[380px] flex justify-center flex-wrap gap-2">
        <div className="flex flex-col panel w-[180px] h-[180px]">
          <span className="title">Catch Rate</span>
          <div className="text-2xl font-bold h-full flex justify-center items-center">
            {speciesData?.capture_rate}
          </div>
        </div>
        <div className="flex flex-col panel w-[180px] h-[180px]">
          <span className="title">Egg Steps</span>
          <div className="text-2xl font-bold h-full flex justify-center items-center">
            {speciesData && (speciesData?.hatch_counter * 128).toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col panel w-[180px] h-[180px]">
          <span className="title">Growth Rate</span>
          <div className="font-bold h-full flex flex-col justify-center items-center gap-3">
            <p className="uppercase">{pokemonGrowthRate?.name}</p>
            <p>{getExperience().toLocaleString()} Points</p>
          </div>
        </div>
        <div className="flex flex-col panel w-[180px] h-[180px]">
          <span className="title">Base Happiness</span>
          <div className="text-2xl font-bold h-full flex justify-center items-center">
            {speciesData?.base_happiness}
          </div>
        </div>
      </div>
    )
  );
};

export default PokemonMiscData;
