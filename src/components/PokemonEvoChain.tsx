import React, { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { ChainLink, Pokemon, PokemonSpecies } from "pokenode-ts";
import { blocked_evo_forms } from "../data";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";

const PokemonEvoChain = () => {
  const { isLoading, evoChain, getResouceByUrl, pokemonId } =
    usePokemonContext();

  const [stageList, setStageList] = useState<any[]>([]);
  const [evoLoading, setEvoLoading] = useState(true);

  const swappedEvoLines = [22, 33, 47, 67, 213, 383];

  useEffect(() => {
    setStageList([]);
    setEvoLoading(true);
  }, [pokemonId]);

  useEffect(() => {
    if (evoChain)
      getEvoData(evoChain.chain, 0).then((res) => {
        getEvoLine(res).then((res) => {
          Promise.allSettled(res).then(() => {
            setStageList(res);
            setEvoLoading(false);
          });
        });
      });
  }, [evoChain]);

  const getEvoData = async (evoData: ChainLink, stageNum: number) => {
    let evoLine: any = await getResouceByUrl(evoData.species.url).then(
      async (res) => {
        let result = [
          {
            species: res,
            stage: stageNum,
            evoDetails: evoData.evolution_details,
          },
        ];
        if (evoData.evolves_to.length > 0) {
          const evolutionPromises = evoData.evolves_to.map((e) =>
            getEvoData(e, stageNum + 1)
          );

          const subResults = await Promise.all(evolutionPromises);

          result.push(...[].concat(...subResults));
        }
        return result;
      }
    );
    return evoLine;
  };

  const getEvoLine = async (evoData: any) => {
    const groupedEvoData: any = {};
    for (const cur of evoData) {
      const varPromises: any = [];
      for (const v of cur.species.varieties) {
        if (!blocked_evo_forms.some((form) => v.pokemon.name.includes(form))) {
          const varData: Pokemon = await getResouceByUrl(v.pokemon.url);
          let result = [];
          if (cur.evoDetails.length > 0) {
            result.push(
              <>
                <FaLongArrowAltDown className="text-[4rem] my-4 sm:hidden" />
                <FaLongArrowAltRight className="text-[4rem] mx-4 hidden sm:block" />
              </>
            );
          }
          result.push(
            <EvoImage
              key={varData.id}
              species={cur.species}
              pokemon={varData}
            />
          );
          varPromises.push(
            <div className="flex flex-col sm:flex-row w-full sm:h-full items-center">
              {result}
            </div>
          );
        }
      }
      if (!groupedEvoData[cur.stage]) {
        groupedEvoData[cur.stage] = [];
      }

      const varList = await Promise.all(varPromises);

      groupedEvoData[cur.stage].push(...[].concat(...varList));
    }

    const eleList = await Promise.all(
      Object.entries(groupedEvoData).map(
        async ([stage, image], index: number) => {
          console.log(stage, image);
          return (
            <div
              key={index}
              className="flex flex-row sm:flex-col w-full h-full justify-center items-center gap-4"
            >
              {image as React.ReactNode}
            </div>
          );
        }
      )
    );
    return eleList;
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="sm:w-[60%] sm:rounded-xl overflow-hidden w-full min-h-[300px] dark:text-white bg-black/40 mt-10 flex flex-col items-center justify-center text-center relative mb-10">
          <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase absolute top-0">
            Evolution Line
          </span>
          {evoLoading ? (
            <div className="bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain animate-spin"></div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-10 mb-4">
              {stageList.map((stage, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row w-full h-full items-center justify-center gap-4"
                  >
                    {stage as React.ReactNode}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

interface Props {
  species: PokemonSpecies;
  pokemon: Pokemon;
}
const EvoImage = ({ species, pokemon }: Props) => {
  const { getEnglishName } = usePokemonContext();
  return (
    <div className="text-white bg-black/40 w-full rounded-xl sm:w-[120px] sm:h-full min-h-[120px] min-w-[120px] flex flex-col justify-center items-center">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        className="h-[80px] w-[80px] mb-2"
      />
      <p className="text-center font-semibold">
        {getEnglishName(species.names)}
      </p>
    </div>
  );
};

export default PokemonEvoChain;
