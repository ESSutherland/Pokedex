import { usePokemonContext } from "../context/PokemonContext";

const PokemonAbilities = () => {
  const { abilityList, getEnglishName, getEnglish } = usePokemonContext();
  return (
    <div className="w-full panel flex flex-col gap-1">
      <span className="title">Abilities</span>
      {abilityList?.map((ability, index) => {
        return (
          <div
            key={index}
            className="group text-lg font-bold flex flex-col text-left justify-center items-center w-full bg-white/20 dark:bg-black/10 hover:bg-slate-200 hover:dark:bg-slate-800 transition-all hover:cursor-help"
          >
            <div className="flex items-center justify-center h-10">
              {getEnglishName(ability.ability.names)}{" "}
              {ability.is_hidden && (
                <span className="ml-3 text-[12px] leading-tight">(Hidden)</span>
              )}
            </div>
            <div className="flex justify-center items-center w-full bg-white/20 dark:bg-black/20 text-sm text-center h-0 origin-top scale-y-0 group-hover:h-[100px] group-hover:scale-y-100 transition-all px-4">
              {getEnglish(abilityList[index].ability.flavor_text_entries)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonAbilities;
