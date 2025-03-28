import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

interface Props {
  handleGenderClick: () => void;
  is_female: boolean;
}
const PokemonGenderButton = ({ handleGenderClick, is_female }: Props) => {
  return (
    <button
      type="button"
      className={`p-3 rounded-full mb-6 border-4 border-black/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all dark:text-white ${
        is_female ? "bg-pink-500" : "bg-blue-500"
      }`}
      onClick={handleGenderClick}
    >
      {is_female ? (
        <BiFemaleSign className="w-[25px] h-[25px] opacity-70" />
      ) : (
        <BiMaleSign className="w-[25px] h-[25px] opacity-70" />
      )}
    </button>
  );
};

export default PokemonGenderButton;
