import {
  MainClient,
  Pokemon,
  PokemonSpecies,
  PokemonSpeciesVariety,
  Name,
  NamedAPIResource,
} from "pokenode-ts";
import { useEffect, useState, useCallback, MouseEvent } from "react";
import PokemonImage from "./components/PokemonImage";
import PokemonScrollBar from "./components/PokemonScrollBar";
import PokemonHeader from "./components/PokemonHeader";
import blocked_forms from "./data";

function App() {
  const apiClient = new MainClient();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonId, setPokemonId] = useState(1);
  const [speciesData, setSpeciesData] = useState<PokemonSpecies>();
  const [varieties, setVarieties] = useState<(Pokemon | undefined)[]>();
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [isShiny, setIsShiny] = useState(false);
  const [varietyIndex, setVarietyIndex] = useState(0);
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>();

  useEffect(() => {
    getPokemonList().then((l) => {
      setPokemonList(l.results);
    });
  }, []);

  useEffect(() => {
    loadData(0);
  }, [pokemonId]);

  useEffect(() => {
    loadData(varietyIndex);
  }, [varietyIndex]);

  const loadData = (id: number) => {
    setIsLoading(true);
    setIsShiny(false);
    setVarietyIndex(id);
    getPokemonSpeciesData(pokemonId).then((species: PokemonSpecies) => {
      setSpeciesData(species);
      getVarietiesData(species).then((varieties: (Pokemon | undefined)[]) => {
        let list = varieties.filter((x) => {
          return x !== undefined;
        });
        setVarieties(list);
        setPokemonData(varieties[id]);
        setIsLoading(false);
      });
    });
  };

  const updatePokemon = useCallback(
    (id: number) => {
      setPokemonId(id);
    },
    [pokemonId]
  );

  const getPokemonList = async () => {
    const l = await apiClient.pokemon.listPokemons(0, 1025);
    return l;
  };

  const getResourceData = async (url: string) => {
    const r = await apiClient.utility.getResourceByUrl(url);
    return r;
  };

  const getPokemonSpeciesData = async (id: number) => {
    const p = await apiClient.pokemon.getPokemonSpeciesById(id);
    return p;
  };

  const getPokemonData = async (id: number) => {
    const p = await apiClient.pokemon.getPokemonById(id);
    return p;
  };

  const getVarietiesData = async (species: PokemonSpecies) => {
    let varList = species.varieties.map(
      async (variety: PokemonSpeciesVariety) => {
        let p: Pokemon = await apiClient.utility.getResourceByUrl(
          variety.pokemon.url
        );
        if (!blocked_forms.some((ele) => variety.pokemon.name.includes(ele)))
          return p;
      }
    );
    return Promise.all(varList);
  };

  const getEnglishName = useCallback((nameList: Name[] | undefined) => {
    let englishName = "";
    nameList?.forEach((name) => {
      if (name.language.name === "en") {
        englishName = name.name;
      }
    });
    return englishName;
  }, []);

  const handleShinyClick = () => {
    setIsShiny((c) => !c);
  };

  const handlePrevVarietyClick = () => {
    setVarietyIndex((c) => (c -= 1));
  };

  const handleNextVarietyClick = () => {
    setVarietyIndex((c) => (c += 1));
  };

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col w-full items-center">
          <PokemonHeader
            id={pokemonId}
            name={getEnglishName(speciesData?.names)}
            max_id={pokemonList ? pokemonList?.length : 0}
            updatePokemon={updatePokemon}
          />
          <div className="flex flex-1 justify-center">
            <PokemonImage pokemon={pokemonData} is_shiny={isShiny} />
            <PokemonScrollBar
              pokemon_list={pokemonList}
              updatePokemon={updatePokemon}
            />
          </div>
          <div className="flex justify-between w-[200px]">
            <button
              type="button"
              onClick={handlePrevVarietyClick}
              disabled={varietyIndex === 0}
            >
              Prev
            </button>
            <button type="button" onClick={handleShinyClick}>
              Shiny
            </button>
            <button
              type="button"
              onClick={handleNextVarietyClick}
              disabled={varieties && varietyIndex === varieties.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
