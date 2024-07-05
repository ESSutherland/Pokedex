import { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";

const PokemonTypeEffects = () => {
  const { pokemonTypes, allTypes, isLoading } = usePokemonContext();

  const [typeChart, setTypeChart] = useState<any[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    setChartLoading(true);
    getTypeChart().then((res) => {
      getDamageFrom(res).then((c) => {
        setTypeChart(c);
        setChartLoading(false);
      });
    });
  }, [pokemonTypes, allTypes]);

  const getTypeChart = async () => {
    const chart: { name: string; damage: number }[] = [];
    allTypes?.forEach((type) => {
      if (type.name === "unknown" || type.name === "shadow") return;
      chart.push({ name: type.name, damage: 1 });
    });
    return chart;
  };

  const getDamageFrom = async (inChart: any[]) => {
    let tempChart = inChart;
    pokemonTypes?.forEach((type) => {
      type.damage_relations.double_damage_from.forEach((dType) => {
        tempChart.forEach((chart, index) => {
          if (chart.name === dType.name) {
            tempChart[index].damage *= 2;
          }
        });
      });
      type.damage_relations.half_damage_from.forEach((dType) => {
        tempChart.forEach((chart, index) => {
          if (chart.name === dType.name) {
            tempChart[index].damage /= 2;
          }
        });
      });
      type.damage_relations.no_damage_from.forEach((dType) => {
        tempChart.forEach((chart, index) => {
          if (chart.name === dType.name) {
            tempChart[index].damage *= 0;
          }
        });
      });
    });
    return tempChart;
  };

  return (
    !isLoading && (
      <div className="w-full panel !justify-start flex flex-col">
        <span className="title">Type Effectiveness</span>
        {!chartLoading && (
          <div className="flex flex-wrap w-full h-full max-w-[600px] justify-center items-center gap-2 p-3 font-bold">
            {typeChart.map((type, index) => {
              if (type.name === "stellar") return;
              return (
                <div
                  key={index}
                  className="w-[80px] h-[100px] flex flex-col justify-center items-center bg-white/40 dark:bg-black/40 rounded-xl gap-2"
                >
                  <div
                    style={{ backgroundColor: `var(--${type.name})` }}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full p-2 border-2 border-black/30"
                  >
                    <img src={`icons/${type.name}.svg`} alt={type.name} />
                  </div>
                  <span
                    className={`${
                      type.damage > 1
                        ? "text-red-500"
                        : type.damage < 1
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {type.damage}x
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

export default PokemonTypeEffects;
