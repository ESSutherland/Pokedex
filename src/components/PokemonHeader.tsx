import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: number;
  name: string;
  max_id: number;
  updatePokemon: (id: number) => void;
}
const PokemonHeader = ({ id, name, max_id, updatePokemon }: Props) => {
  const handlePrevButtonClick = () => {
    if (id > 1) {
      updatePokemon(id - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (id < max_id) {
      updatePokemon(id + 1);
    }
  };

  return (
    <div className="flex justify-between w-[400px]">
      <button
        onClick={handlePrevButtonClick}
        disabled={id === 1}
        className="disabled:text-gray-400"
      >
        <FontAwesomeIcon icon={faCaretLeft} className={"w-[50px] h-[50px]"} />
      </button>
      <div className="text-4xl font-bold">{name}</div>
      <button
        onClick={handleNextButtonClick}
        disabled={id === max_id}
        className="disabled:text-gray-400"
      >
        <FontAwesomeIcon icon={faCaretRight} className="w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default PokemonHeader;
