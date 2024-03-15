import {
  Ability,
  EvolutionChain,
  MainClient,
  Name,
  NamedAPIResource,
  Pokemon,
  PokemonAbility,
  PokemonForm,
  PokemonSpecies,
  Type,
} from "pokenode-ts";
import React, { useContext, useRef } from "react";
import { useEffect, useState, useCallback, createContext } from "react";
import { blocked_forms } from "../data";

interface PokemonContextProps {
  children: React.ReactNode;
}

interface PokemonContextType {
  isLoading: boolean;
  pokemonId: number;
  speciesData: PokemonSpecies | undefined;
  varietiesList: Pokemon[] | undefined;
  formsList: PokemonForm[] | undefined;
  pokemonData: Pokemon | undefined;
  varietyIndex: number;
  formIndex: number;
  pokemonList: NamedAPIResource[] | undefined;
  pokemonGenus: string | undefined;
  abilityList: PokemonAbilityType[] | undefined;
  currentForm: PokemonForm | undefined;
  pokemonTypes: Type[] | undefined;
  evoChain: EvolutionChain | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updatePokemon: (id: number) => void;
  updateForm: (id: number) => void;
  setSpeciesData: React.Dispatch<
    React.SetStateAction<PokemonSpecies | undefined>
  >;
  setVarietiesList: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>;
  setFormsList: React.Dispatch<React.SetStateAction<PokemonForm[]>>;
  setPokemonData: React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
  updateVariety: (id: number) => void;
  setPokemonList: React.Dispatch<
    React.SetStateAction<NamedAPIResource[] | undefined>
  >;
  getEnglishName: (nameList: Name[] | undefined) => string;
  getEnglish: (nameList: any[] | undefined) => string;
  getResouceByUrl: (url: string) => Promise<any>;
}

interface PokemonAbilityType {
  ability: Ability;
  is_hidden: boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const PokemonContextProvider = ({ children }: PokemonContextProps) => {
  const apiClient = new MainClient();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonId, setPokemonId] = useState(1);
  const [speciesData, setSpeciesData] = useState<PokemonSpecies>();
  const [varietiesList, setVarietiesList] = useState<Pokemon[]>();
  const [formsList, setFormsList] = useState<PokemonForm[]>([]);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [varietyIndex, setVarietyIndex] = useState(0);
  const [formIndex, setFormIndex] = useState(0);
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>();
  const [pokemonGenus, setPokemonGenus] = useState<string>();
  const [abilityList, setAbilityList] = useState<PokemonAbilityType[]>([]);
  const [currentForm, setCurrentForm] = useState<PokemonForm>();
  const [pokemonTypes, setPokemonTypes] = useState<Type[]>();
  const [evoChain, setEvoChain] = useState<EvolutionChain>();

  const varRef = useRef<number>();
  const formRef = useRef<number>();

  varRef.current = varietyIndex;
  formRef.current = formIndex;

  useEffect(() => {
    getPokemonList().then((l) => {
      setPokemonList(l.results);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [pokemonId, varietyIndex, formIndex]);

  useEffect(() => {
    setVarietyIndex(0);
    setFormIndex(0);
  }, [pokemonId]);

  useEffect(() => {
    document.title = `Pokedex - #${pokemonId
      .toString()
      .padStart(4, "0")} | ${getEnglishName(speciesData?.names)}`;
  }, [speciesData]);

  const loadData = () => {
    const id = varRef.current || 0;
    const formId = formRef.current || 0;

    setIsLoading(true);
    setVarietyIndex(id);
    setFormIndex(formId);
    getPokemonSpeciesData(pokemonId).then((species: PokemonSpecies) => {
      setSpeciesData(species);
      setPokemonGenus(getGenus(species));
      getEvoChain(species).then((evoChain) => {
        setEvoChain(evoChain as EvolutionChain);
      });
      getVarietiesData(species).then((varieties: Pokemon[]) => {
        let list = varieties.filter((x) => {
          return x !== undefined;
        });
        setVarietiesList(list);
        setPokemonData(list[id]);
        getAbilities(list[id]).then((abilities) => {
          getAbilityList(list[id].abilities, abilities).then((abilityList) => {
            setAbilityList(abilityList);
          });
        });
        getForms(list[id]).then((forms) => {
          setFormsList(forms);
          setCurrentForm(forms[formId]);
          getTypes(forms[formId]).then((types) => {
            setPokemonTypes(types);
            setIsLoading(false);
          });
        });
      });
    });
  };

  const updatePokemon = useCallback(
    (id: number) => {
      setPokemonId(id);
    },
    [pokemonId]
  );

  const updateVariety = useCallback(
    (id: number) => {
      setVarietyIndex(id);
    },
    [pokemonId]
  );

  const updateForm = useCallback(
    (id: number) => {
      setFormIndex(id);
    },
    [pokemonId]
  );

  const getPokemonList = async () => {
    const l = await apiClient.pokemon.listPokemons(0, 1025);
    return l;
  };

  const getPokemonSpeciesData = async (id: number) => {
    const p = await apiClient.pokemon.getPokemonSpeciesById(id);
    return p;
  };

  const getVarietiesData = async (species: PokemonSpecies) => {
    let list = species.varieties.filter((x) => {
      return !blocked_forms.some((ele) => x.pokemon.name.includes(ele));
    });

    let varList = list.map(async (v) => {
      let p = await apiClient.pokemon.getPokemonByName(v.pokemon.name);
      return p;
    });

    return Promise.all(varList);
  };

  const getForms = async (pokemon: Pokemon) => {
    let list = pokemon.forms.filter((x) => {
      return !blocked_forms.some((ele) => x.name.includes(ele));
    });

    let formList = list.map(async (form) => {
      let f: PokemonForm = await apiClient.pokemon.getPokemonFormByName(
        form.name
      );
      return f;
    });
    return Promise.all(formList);
  };

  const getAbilityList = async (
    list: PokemonAbility[],
    abilities: Ability[]
  ) => {
    const abilityList = list.map((ability, index) => {
      return {
        ability: abilities[index],
        is_hidden: ability.is_hidden,
      };
    });
    return abilityList;
  };

  const getAbilities = async (pokemon: Pokemon) => {
    let abilityList = pokemon.abilities.map(async (ability) => {
      let a: Ability = await apiClient.pokemon.getAbilityByName(
        ability.ability.name
      );
      return a;
    });
    return Promise.all(abilityList);
  };

  const getTypes = async (form: PokemonForm) => {
    let typeList = form.types.map(async (type) => {
      let t: Type = await apiClient.pokemon.getTypeByName(type.type.name);
      return t;
    });
    return Promise.all(typeList);
  };

  const getEvoChain = async (species: PokemonSpecies) => {
    let evoChain = await apiClient.utility.getResourceByUrl(
      species.evolution_chain.url
    );
    return evoChain;
  };

  const getResouceByUrl = async (url: string) => {
    let res = await apiClient.utility.getResourceByUrl(url);
    return res;
  };

  const getGenus = (species: PokemonSpecies) => {
    let genus = "";
    species.genera.forEach((gen) => {
      if (gen.language.name === "en") {
        genus = gen.genus;
      }
    });
    return genus;
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

  const getEnglish = useCallback((nameList: any[] | undefined) => {
    let englishName = "";
    nameList?.forEach((name) => {
      if (
        name.language.name === "en" &&
        (name.version_group.name === "scarlet-violet" ||
          name.version_group.name === "sword-shield")
      ) {
        englishName = name.flavor_text;
      }
    });
    return englishName;
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        isLoading,
        pokemonId,
        speciesData,
        varietiesList,
        formsList,
        pokemonData,
        varietyIndex,
        formIndex,
        pokemonList,
        pokemonGenus,
        abilityList,
        currentForm,
        pokemonTypes,
        evoChain,
        setIsLoading,
        updatePokemon,
        setSpeciesData,
        setVarietiesList,
        setFormsList,
        setPokemonData,
        updateVariety,
        updateForm,
        setPokemonList,
        getEnglishName,
        getEnglish,
        getResouceByUrl,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error(
      "usePokemonContext must be used within a PokemonContextProvider"
    );
  }
  return context;
};

export default PokemonContextProvider;
