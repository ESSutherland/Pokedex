import { usePokemonContext } from "../context/PokemonContext";
import PokemonAbilities from "./PokemonAbilities";
import PokemonEggGroups from "./PokemonEggGroups";

const PokemonInfo = () => {
  const { isLoading, pokemonData, speciesData } = usePokemonContext();

  const getWeightInKg = () => {
    if (!pokemonData) return 0;
    return pokemonData?.weight / 10;
  };

  const getWeightInLbs = () => {
    if (!pokemonData) return 0;
    return (pokemonData?.weight / 4.536).toFixed(1);
  };

  const getHeightInM = () => {
    if (!pokemonData) return 0;
    return pokemonData?.height / 10;
  };

  const getHeightInFt = () => {
    const meterToFeet = 3.28084;

    if (!pokemonData) return 0;

    let num: number = pokemonData?.height / 10;
    let num2 = Math.round(num * meterToFeet * 10) / 10;
    let num3 = Math.floor(num2);
    let num4 = num2 - num3;
    let num5 = Math.round(12 * num4);

    let feet = `${num3}'`;
    let inches = `${num5}"`;

    return `${feet} ${inches}`;
  };

  const getMaleRate = () => {
    if (!speciesData) return 0;

    let rate = 100 - (speciesData?.gender_rate / 8) * 100;
    if (rate <= 100) {
      return rate;
    }
    return 0;
  };

  const getFemaleRate = () => {
    if (!speciesData) return 0;
    let rate = (speciesData.gender_rate / 8) * 100;
    if (rate > 0) {
      return rate;
    }
    return 0;
  };

  return (
    <div className="flex flex-col gap-3 w-[95%] max-w-[450px] mx-10 justify-center items-center">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="flex w-full gap-3 justify-center items-center">
            <div className="w-1/2 panel flex flex-col font-semibold">
              <span className="title">Weight</span>
              <div className="py-2 text-xl w-full border-b border-black/60">
                {getWeightInKg()}kg
              </div>
              <div className="py-2 text-xl w-full">{getWeightInLbs()}lbs</div>
            </div>
            <div className="w-1/2 panel flex flex-col font-semibold">
              <span className="title">Height</span>
              <div className="py-2 text-xl w-full border-b border-black/80">
                {getHeightInM()}m
              </div>
              <div className="py-2 text-xl w-full">{getHeightInFt()}ft</div>
            </div>
          </div>
          <div className="w-full panel flex flex-col">
            <span className="title">Gender Rate</span>
            <div className="py-3 text-sm font-semibold w-full flex justify-center items-center">
              {getMaleRate()}%<span className="mx-1 px-1 text-blue-500">♂</span>
              <div
                className={`w-[50%] flex h-5 rounded-2xl overflow-hidden bg-slate-400 border border-black/50 dark:border-white/50`}
              >
                <div
                  style={{ width: `${getMaleRate()}%` }}
                  className="bg-gradient-to-b from-blue-500 to-blue-700 h-full"
                ></div>
                <div
                  style={{ width: `${getFemaleRate()}%` }}
                  className="bg-gradient-to-b from-pink-500 to-pink-700 h-full"
                ></div>
              </div>
              <span className="mx-1 px-1 text-pink-500">♀</span>
              {getFemaleRate()}%
            </div>
          </div>
          <PokemonEggGroups />
          <PokemonAbilities />
        </>
      )}
    </div>
  );
};

export default PokemonInfo;
