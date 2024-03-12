import { NamedAPIResource } from "pokenode-ts";
import PokemonScrollPane from "./PokemonScrollPane";

interface Props {
  pokemon_list: NamedAPIResource[] | undefined;
  updatePokemon: (id: number) => void;
}

const PokemonScrollBar = ({ pokemon_list, updatePokemon }: Props) => {
  return (
    <div className="max-h-[400px] overflow-y-scroll">
      {pokemon_list?.map((_pokemon, index) => {
        return (
          <PokemonScrollPane
            id={index + 1}
            updatePokemon={updatePokemon}
            key={"scroll" + index}
          />
        );
      })}
    </div>
  );
};

export default PokemonScrollBar;
