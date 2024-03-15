import { usePokemonContext } from "../context/PokemonContext";
import PokemonAbilities from "./PokemonAbilities";

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
    <div className="absolute flex flex-wrap gap-2 w-full max-w-[500px] top-[610px] 2xl:top-[100px] 2xl:right-[40px] justify-center">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="w-[150px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center overflow-hidden justify-center rounded-lg border border-black/60 dark:text-white shadow-xl">
            <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
              Weight
            </span>
            <div className="py-2 text-xl w-full border-b border-black/60">
              {getWeightInKg()}kg{" "}
            </div>
            <div className="py-2 text-xl w-full">{getWeightInLbs()}lbs</div>
          </div>
          <div className="w-[150px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center overflow-hidden justify-center rounded-lg border border-black/60 dark:text-white shadow-xl">
            <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
              Height
            </span>
            <div className="py-2 text-xl w-full border-b border-black/80">
              {getHeightInM()}m{" "}
            </div>
            <div className="py-2 text-xl w-full">{getHeightInFt()}ft</div>
          </div>
          <div className="w-[308px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center overflow-hidden justify-center rounded-lg border border-black/60 dark:text-white shadow-xl">
            <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
              Gender Rate
            </span>
            <div className="py-3 text-sm font-semibold w-full border-b border-black/80 flex justify-center items-center">
              {getMaleRate()}% <span className="mx-1 text-blue-500">♂</span>{" "}
              <div
                className={`w-[150px] flex h-5 rounded-2xl overflow-hidden bg-slate-400 border border-black/70 box-content`}
              >
                <div
                  style={{ width: `${getMaleRate()}%` }}
                  className="bg-blue-500 h-full"
                ></div>
                <div
                  style={{ width: `${getFemaleRate()}%` }}
                  className="bg-pink-500 h-full"
                ></div>
              </div>{" "}
              <span className="mx-1 text-pink-500">♀</span> {getFemaleRate()}%
            </div>
          </div>
          <PokemonAbilities />
        </>
      )}
    </div>
  );
};

export default PokemonInfo;
