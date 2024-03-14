import { usePokemonContext } from "../context/PokemonContext";

const PokemonInfo = () => {
  const { isLoading, pokemonData } = usePokemonContext();

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

  return (
    <div className="absolute flex flex-wrap gap-2 w-full max-w-[500px] top-[610px] 2xl:top-[50px] 2xl:right-[200px] justify-center">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="w-[150px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center justify-center rounded-lg overflow-hidden border border-black/60 dark:text-white">
            <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
              Weight
            </span>
            <div className="py-2 text-xl w-full border-b border-black/60">
              {getWeightInKg()}kg{" "}
            </div>
            <div className="py-2 text-xl w-full">{getWeightInLbs()}lbs</div>
          </div>
          <div className="w-[150px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center justify-center rounded-lg overflow-hidden border border-black/60 dark:text-white">
            <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
              Height
            </span>
            <div className="py-2 text-xl w-full border-b border-black/80">
              {getHeightInM()}m{" "}
            </div>
            <div className="py-2 text-xl w-full">{getHeightInFt()}ft</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonInfo;
