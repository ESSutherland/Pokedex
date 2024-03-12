import PokemonScrollIcon from "./PokemonScrollIcon";
interface Props {
  id: number;
  updatePokemon: (id: number) => void;
}

const PokemonScrollPane = ({ id, updatePokemon }: Props) => {
  return (
    <div onClick={() => updatePokemon(id)}>
      <PokemonScrollIcon id={id} />
    </div>
  );
};

export default PokemonScrollPane;
