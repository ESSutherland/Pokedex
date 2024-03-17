import { useEffect, useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";

interface Props {
  category: string;
  title: string;
}
const PokemonLevelMoves = ({ category, title }: Props) => {
  const [moveList, setMoveList] = useState<any[]>([]);
  const [moveDataList, setMoveDataList] = useState<any[]>([]);
  const [movesLoading, setMovesLoading] = useState(true);

  const { pokemonData, getEnglishName, getResourceByUrl, isLoading } =
    usePokemonContext();

  useEffect(() => {
    setMovesLoading(true);
    getMoves().then((moves) => {
      var list = moves.sort((a, b) => {
        let keyA = a.details.level_learned_at;
        let keyB = b.details.level_learned_at;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      setMoveList(list);
      getMoveData(moves).then((moveData) => {
        setMoveDataList(moveData);
        setMovesLoading(false);
      });
    });
  }, [pokemonData]);

  const getMoves = async () => {
    let allowedVersions = [
      "scarlet-violet",
      "sword-shield",
      "brilliant-diamond-and-shining-pearl",
      "lets-go-pikachu-lets-go-eevee",
      "ultra-sun-ultra-moon",
    ];

    let moveList: any[] = [];

    for (let i = 0; i < allowedVersions.length; i++) {
      pokemonData?.moves.forEach((move) => {
        move.version_group_details.forEach((details) => {
          if (
            details.move_learn_method.name == category &&
            details.version_group.name == allowedVersions[i]
          ) {
            moveList.push({
              move: move.move,
              details: details,
            });
          }
        });
      });
      if (moveList.length > 0) {
        break;
      }
    }
    return moveList;
  };

  const getMoveData = async (list: any[]) => {
    const moves = list.map(async (move) => {
      const moveData = await getResourceByUrl(move.move.url);

      return moveData;
    });
    return Promise.all(moves);
  };

  return (
    <>
      {!isLoading && moveDataList.length > 0 && !movesLoading && (
        <div className="w-[95%] panel flex flex-col mb-4">
          <span className="title">{title}</span>
          <table className="w-full h-auto table table-auto border-collapse relative">
            <thead className="h-12">
              {category === "level-up" ? <th>LVL</th> : <th>---</th>}
              <th>MOVE</th>
              <th className="hidden xl:table-cell">DESCRIPTION</th>
              <th>TYPE</th>
              <th>CAT</th>
              <th>PWR</th>
              <th>PP</th>
              <th>ACC</th>
            </thead>
            {moveDataList.map((move, index) => {
              const moveName = getEnglishName(move.names);
              const moveLevel =
                category === "level-up" &&
                moveList[index].details.level_learned_at;
              const displayLevel =
                moveLevel > 1 ? moveLevel : moveLevel > 0 ? " --- " : "Evolve";
              let textEntries: any[] = [];
              move.flavor_text_entries.forEach((txt: any) => {
                if (txt.language.name == "en") textEntries.push(txt);
              });
              const latest = textEntries.pop();
              const text = latest != undefined ? latest.flavor_text : "---";
              const icon = `icons/${move.type.name}.svg`;
              let damageIcon = `${move.damage_class.name}.png`;

              let requirement =
                category === "level-up"
                  ? displayLevel
                  : category === "machine"
                  ? "TM"
                  : "---";

              return (
                <>
                  <tbody className="group select-none">
                    <tr
                      key={index}
                      className="h-[40px] bg-white/60 dark:bg-black/60 move-table"
                    >
                      <td className="bg-white/80 dark:bg-black/80 !max-w-[90px] !min-w-[75px] ">
                        {requirement}
                      </td>
                      <td className="min-w-[120px]">{moveName}</td>
                      <td className="hidden xl:table-cell !font-normal ">
                        {text}
                      </td>
                      <td className="">
                        <div
                          style={{
                            backgroundColor: `var(--${move.type.name})`,
                          }}
                          className="rounded-full w-[25px] h-[25px] p-1 mx-auto"
                        >
                          <img src={icon} className="" />
                        </div>
                      </td>
                      <td className="">
                        <div
                          style={{
                            backgroundColor: `var(--${move.damage_class.name})`,
                          }}
                          className="rounded-full w-[25px] h-[25px] flex items-center justify-center mx-auto"
                        >
                          <img src={damageIcon} className="w-[80%] h-[80%]" />
                        </div>
                      </td>
                      <td>{move.power || "---"}</td>
                      <td>{move.pp}</td>
                      <td>{move.accuracy || "---"}</td>
                    </tr>
                    <tr className="w-full bg-white/80 dark:bg-black/80 h-32 hidden group-hover:table-row xl:group-hover:hidden transition-all">
                      <td colSpan={7} className="px-2 !font-normal">
                        {text}
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default PokemonLevelMoves;
