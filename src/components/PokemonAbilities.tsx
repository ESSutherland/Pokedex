import { usePokemonContext } from "../context/PokemonContext";

const PokemonAbilities = () => {
  const { abilityList, getEnglishName, getEnglish } = usePokemonContext();
  return (
    <div className="w-[308px] text-center flex flex-col bg-slate-200 dark:bg-slate-600 items-center overflow-hidden justify-center rounded-lg border border-black/60 dark:text-white shadow-xl gap-1">
      <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase">
        Abilities
      </span>
      {abilityList?.map((ability, index) => {
        return (
          <div
            key={index}
            className="group text-lg font-bold flex flex-col text-left justify-center items-center w-full bg-black/10 hover:bg-black/0 transition-all hover:cursor-help"
          >
            <div className="flex items-center justify-center h-10">
              {getEnglishName(ability.ability.names)}{" "}
              {ability.is_hidden && (
                <span className="ml-3 text-[12px] leading-tight">(Hidden)</span>
              )}
            </div>
            <div className="flex justify-center items-center w-full bg-slate-300 dark:bg-slate-700 text-sm text-center h-0 scale-y-0 group-hover:h-[100px] group-hover:scale-y-100 transition-all px-4">
              {getEnglish(abilityList[index].ability.flavor_text_entries)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonAbilities;
