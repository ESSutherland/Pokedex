import React, { useEffect, useRef, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import {
  ChainLink,
  EvolutionChain,
  Pokemon,
  PokemonSpecies,
} from "pokenode-ts";
import { blocked_evo_forms } from "../data";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";

const PokemonEvoChain = () => {
  const { isLoading, evoChain, getResouceByUrl, pokemonId } =
    usePokemonContext();

  const [stageList, setStageList] = useState<any[]>([]);
  const [evoLoading, setEvoLoading] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);
  const stateRef = useRef<boolean>();

  stateRef.current = isSwapped;

  const swappedEvoLines = [22, 33, 47, 67, 213, 383];

  useEffect(() => {
    setStageList([]);
    setEvoLoading(true);
  }, [pokemonId]);

  useEffect(() => {
    if (evoChain)
      getEvoData(evoChain, evoChain.chain, 0).then((res) => {
        setIsSwapped(swappedEvoLines.includes(res[0].chainId as number));
        getEvoLine(res).then((res) => {
          Promise.allSettled(res).then(() => {
            setStageList(res);
            setEvoLoading(false);
          });
        });
      });
  }, [evoChain]);

  const getEvoData = async (
    chain: EvolutionChain,
    evoData: ChainLink,
    stageNum: number
  ) => {
    let evoLine: any = await getResouceByUrl(evoData.species.url).then(
      async (res) => {
        let result = [
          {
            chainId: chain.id,
            species: res,
            stage: stageNum,
            evoDetails: evoData.evolution_details,
          },
        ];
        if (evoData.evolves_to.length > 0) {
          const evolutionPromises = evoData.evolves_to.map((e) =>
            getEvoData(chain, e, stageNum + 1)
          );

          const subResults = await Promise.all(evolutionPromises);

          result.push(...[].concat(...subResults));
        }
        return result;
      }
    );
    return evoLine;
  };

  //account for missing evo details in API
  const missingEvoDetails = [1011, 1019, 1018, 1013];

  const getEvoLine = async (evoData: any) => {
    const groupedEvoData: any = {};
    for (const cur of evoData) {
      const varPromises: any = [];
      let index = 0;
      for (const v of cur.species.varieties) {
        if (!blocked_evo_forms.some((form) => v.pokemon.name.includes(form))) {
          const varData: Pokemon = await getResouceByUrl(v.pokemon.url);
          let result = [];
          if (
            cur.evoDetails.length > 0 ||
            missingEvoDetails.includes(varData.id)
          ) {
            result.push(
              <>
                <FaLongArrowAltDown
                  className={`text-[4rem] my-4 ${
                    stateRef.current ? "hidden xl:block" : "xl:hidden"
                  }`}
                />
                <FaLongArrowAltRight
                  className={`text-[4rem] mx-4  ${
                    stateRef.current ? "xl:hidden" : "hidden xl:block"
                  }`}
                />
              </>
            );
          }
          result.push(
            <EvoImage
              key={varData.id}
              species={cur.species}
              pokemon={varData}
              isSwapped={stateRef.current as boolean}
              varIndex={index}
            />
          );
          varPromises.push(
            <div
              className={`flex items-center ${
                stateRef.current
                  ? "xl:flex-col flex-row xl:w-full h-full"
                  : "flex-col xl:flex-row w-full xl:h-full"
              }`}
            >
              {result}
            </div>
          );
        }
        index++;
      }
      if (!groupedEvoData[cur.stage]) {
        groupedEvoData[cur.stage] = [];
      }

      const varList = await Promise.all(varPromises);

      groupedEvoData[cur.stage].push(...[].concat(...varList));
    }

    let prevImages: any = [];
    const eleList = await Promise.all(
      Object.entries(groupedEvoData).map(
        async ([_stage, image], index: number) => {
          const images: [] = image as [];
          let imgDiv = (
            <div
              key={index}
              className={`flex  gap-4 ${
                stateRef.current
                  ? "xl:flex-row flex-col"
                  : "flex-row xl:flex-col"
              }
              ${
                images.length < prevImages.length
                  ? "self-end justify-self-end"
                  : "justify-center items-center h-full w-full"
              }`}
            >
              {image as React.ReactNode}
            </div>
          );
          prevImages = image;
          return imgDiv;
        }
      )
    );

    //Swap Galarian Slowbro and Slowking
    if (evoChain?.id == 33) {
      let temp = eleList[1].props.children[1];
      eleList[1].props.children[1] = eleList[1].props.children[2];
      eleList[1].props.children[2] = temp;
    }

    return eleList;
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="sm:w-[90%] max-w-[1200px] sm:rounded-xl overflow-hidden w-full min-h-[300px] dark:text-white bg-black/10 dark:bg-black/60 mt-5 flex flex-col items-center justify-center text-center relative mb-10">
          <span className="w-full bg-slate-400 dark:bg-slate-700 font-bold text-lg uppercase absolute top-0">
            Evolution Line
          </span>
          {evoLoading ? (
            <div className="bg-[url('./assets/pokeball.png')] bg-center bg-no-repeat bg-contain animate-spin"></div>
          ) : (
            <div
              className={`flex justify-center items-center mt-10 mb-4 ${
                stateRef.current
                  ? "xl:flex-col flex-row"
                  : "flex-col xl:flex-row"
              }`}
            >
              {stageList.map((stage, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col xl:flex-row w-full h-full items-center justify-center gap-4"
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
  varIndex: number;
  isSwapped: boolean;
}
const EvoImage = ({ species, pokemon, isSwapped, varIndex }: Props) => {
  const { getEnglishName, updatePokemon, updateVariety } = usePokemonContext();
  return (
    <div
      className={`text-white bg-black/20 dark:bg-black/60 rounded-xl min-h-[120px] min-w-[120px] flex flex-col justify-center items-center ${
        isSwapped
          ? "xl:w-full w-[120px] h-full"
          : "w-full xl:w-[120px] xl:h-full"
      }`}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        className="h-[80px] w-[80px] mb-2"
      />
      <p
        className="text-center font-semibold hover:underline cursor-pointer"
        onClick={() => {
          updatePokemon(species.id);
          updateVariety(varIndex);
        }}
      >
        {getEnglishName(species.names)}
      </p>
      <div className="flex justify-center items-center gap-2 pb-2">
        {pokemon.types.map((type, _index) => {
          return (
            <div
              style={{ backgroundColor: `var(--${type.type.name})` }}
              className="w-[20px] h-[20px] flex items-center justify-center rounded-full p-[3px] border border-black/30"
            >
              <img src={`icons/${type.type.name}.svg`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvoChain;
