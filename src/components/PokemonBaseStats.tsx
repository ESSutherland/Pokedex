import { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { Pokemon, Stat } from "pokenode-ts";

const PokemonBaseStats = () => {
  const { pokemonData, getEnglishName, getResouceByUrl, isLoading } =
    usePokemonContext();

  const [baseTotal, setBaseTotal] = useState(0);
  const [statData, setStatData] = useState<Stat[]>([]);

  useEffect(() => {
    if (pokemonData) {
      const total = pokemonData.stats.reduce((acc, stat) => {
        return acc + stat.base_stat;
      }, 0);
      setBaseTotal(total);
      getStatData(pokemonData).then((res) => {
        setStatData(res);
      });
    }
  }, [pokemonData]);

  const getStatData = async (pokemon: Pokemon) => {
    const stats = pokemon.stats.map(async (stat) => {
      return getResouceByUrl(stat.stat.url);
    });
    return Promise.all(stats);
  };

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col gap-4 font-semibold w-full !justify-between xl:max-w-[500px] panel pb-2">
          <span className="title">Base Stats</span>
          {pokemonData?.stats.map((stat, index) => {
            let name = getEnglishName(statData[index].names);
            let sName = name.replace("Special", "Sp.");
            return (
              <div
                key={stat.stat.name}
                className="flex gap-3 justify-center items-center w-full px-3"
              >
                <div className="w-32">{sName}</div>
                <div className="w-10">{stat.base_stat}</div>
                <div className="w-[80%] bg-slate-300 dark:bg-slate-500 h-3 rounded-xl overflow-hidden border border-black/40 dark:border-white/40">
                  <div
                    className="bg-slate-500 dark:bg-slate-800 h-full"
                    style={{
                      width: `${(stat.base_stat / baseTotal) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
          <div className="text-center">Total: {baseTotal}</div>
        </div>
      )}
    </>
  );
};

export default PokemonBaseStats;
