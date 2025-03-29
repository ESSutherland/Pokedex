import { usePokemonContext } from "../context/PokemonContext";
import {
  FaFeather,
  FaEarthAmericas,
  FaGem,
  FaSplotch,
  FaDragon,
  FaCircleQuestion,
  FaSkull,
  FaDroplet,
  FaBug,
  FaHeart,
  FaLeaf,
  FaPerson,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

const PokemonEggGroups = () => {
  const { eggGroups, getEnglishName } = usePokemonContext();
  const [groups, setGroups] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGroups().then((data) => {
      setGroups(data);
      setIsLoading(false);
    });
  }, [eggGroups]);

  const getGroups = async () => {
    let data: any[] = eggGroups || [];
    return Promise.all(data);
  };

  const getGroupIcon = (name: string) => {
    switch (name) {
      case "monster":
        return <FaSkull className="text-2xl" />;
      case "water1":
        return <FaDroplet className="text-2xl" />;
      case "bug":
        return <FaBug className="text-2xl" />;
      case "flying":
        return <FaFeather className="text-2xl" />;
      case "ground":
        return <FaEarthAmericas className="text-2xl" />;
      case "fairy":
        return <FaHeart className="text-2xl" />;
      case "plant":
        return <FaLeaf className="text-2xl" />;
      case "humanshape":
        return <FaPerson className="text-2xl" />;
      case "water3":
        return <FaDroplet className="text-2xl" />;
      case "mineral":
        return <FaGem className="text-2xl" />;
      case "indeterminate":
        return <FaSplotch className="text-2xl" />;
      case "water2":
        return <FaDroplet className="text-2xl" />;
      case "ditto":
        return <FaSplotch className="text-2xl" />;
      case "dragon":
        return <FaDragon className="text-2xl" />;
      case "no-eggs":
        return <FaCircleQuestion className="text-2xl" />;
      case "undiscovered":
        return <FaCircleQuestion className="text-2xl" />;
      default:
        return <FaCircleQuestion className="text-2xl" />;
    }
  };
  return (
    !isLoading && (
      <div className="panel w-full flex flex-col">
        <span className="title">Egg Group(s)</span>
        <div className="flex justify-center items-center gap-4">
          {groups?.map((group, index) => {
            return (
              <div
                className="w-[100px] h-[100px] my-5 flex flex-col gap-2 justify-center items-center font-bold text-sm bg-black/10 border-2 border-black/80 rounded-lg"
                key={index}
              >
                {getEnglishName(group.names)}
                {getGroupIcon(group.name)}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default PokemonEggGroups;
