import { Pokemon, PokemonSpecies } from "pokenode-ts";
import {
  FaCircleQuestion,
  FaHandFist,
  FaFaceLaughBeam,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaRetweet,
  FaArrowsRotate,
} from "react-icons/fa6";
import { usePokemonContext } from "../context/PokemonContext";
import { useEffect, useState } from "react";

interface Props {
  pokemon: Pokemon;
  species: PokemonSpecies;
  evoD: any[] | undefined;
  index: number;
}
const PokemonEvoDetail = ({ pokemon, species, evoD, index }: Props) => {
  const { getResouceByUrl, getEnglishName } = usePokemonContext();
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailData, setDetailData] = useState<any>();

  useEffect(() => {
    getEvoDetail().then((res) => {
      console.log(res);
      setDetailData(res);
    });
  }, []);

  const getEvoDetail = async () => {
    let detail = <></>;
    let idx = index;

    if (species.id === 350 || species.id === 738) idx = 1;
    else if (evoD && species.varieties.length === 1) idx = evoD?.length - 1;

    const evoDetail = evoD ? (evoD[idx] ? evoD[idx] : evoD[0]) : null;

    console.log(pokemon.name, evoDetail);

    if (evoDetail?.trigger.name == "level-up") {
      let item = null;
      let itemName = "";
      let move = null;
      let moveName = "";
      let level_conditions = [];
      let tool_string = "";

      if (evoDetail?.min_level) {
        level_conditions.push(<> {evoDetail?.min_level}</>);
        tool_string += ` To Level ${evoDetail?.min_level}`;
      }

      if (evoDetail?.held_item) {
        item = await getResouceByUrl(evoDetail?.held_item.url);
        itemName = getEnglishName(item.names);
        tool_string += ` Holding ${itemName}`;
        level_conditions.push(
          <img src={item.sprites.default} height={25} width={25}></img>
        );
      }

      if (evoDetail?.min_happiness) {
        tool_string += ` w/ ${evoDetail?.min_happiness} Happiness`;
        level_conditions.push(<FaFaceLaughBeam />);
      }

      if (evoDetail?.known_move) {
        move = await getResouceByUrl(evoDetail?.known_move.url);
        moveName = getEnglishName(move.names);
        tool_string += ` Knowing ${moveName}`;
        level_conditions.push(<FaHandFist />);
      }

      if (evoDetail?.known_move_type) {
        const icon = `icons/${evoDetail?.known_move_type.name}.svg`;
        const type = await getResouceByUrl(evoDetail?.known_move_type.url);
        const typeName = getEnglishName(type.names);

        tool_string += ` Knowing ${typeName} Move`;
        level_conditions.push(
          <div
            className="w-[20px] h-[20px] rounded-full flex justify-center items-center p-[3px] border border-black/30"
            style={{
              backgroundColor: `var(--${evoDetail?.known_move_type.name})`,
            }}
          >
            <img src={icon} width={15}></img>
          </div>
        );
      }

      if (evoDetail?.time_of_day.length > 0) {
        if (evoDetail?.time_of_day == "night") {
          tool_string += " At Night";
          level_conditions.push(<FaMoon />);
        } else if (evoDetail?.time_of_day == "day") {
          tool_string += " During Day";
          level_conditions.push(<FaSun />);
        } else {
          tool_string += " At Dusk";
          level_conditions.push(<FaCloudSun />);
        }
      }

      if (evoDetail?.relative_physical_stats != null) {
        let symbol =
          evoDetail?.relative_physical_stats > 0
            ? ">"
            : evoDetail?.relative_physical_stats == 0
            ? "="
            : "<";
        tool_string += ` While ATK ${symbol} DEF`;
        level_conditions.push(<FaCircleQuestion />);
      }

      if (evoDetail?.gender) {
        if (evoDetail?.gender == 1) {
          tool_string += " Female Only";
          level_conditions.push(<>♀</>);
        } else if (evoDetail?.gender == 2) {
          tool_string += " Male Only";
          level_conditions.push(<>♂</>);
        }
      }

      if (evoDetail?.needs_overworld_rain) {
        tool_string += " While Raining";
        level_conditions.push(<FaCloudShowersHeavy />);
      }

      if (evoDetail?.turn_upside_down) {
        tool_string += " While Upside Down";
        level_conditions.push(<FaRetweet />);
      }

      if (evoDetail?.party_species) {
        let pokemon_species = await getResouceByUrl(
          evoDetail?.party_species.url
        );
        let pokemonName = getEnglishName(pokemon_species.names);
        let pokemon = await getResouceByUrl(
          pokemon_species.varieties[0].pokemon.url
        );
        tool_string += ` With ${pokemonName} In Party`;
        level_conditions.push(
          <img
            src={pokemon.sprites.other.home.front_default}
            height={30}
            width={30}
          ></img>
        );
      }

      if (pokemon.name === "marowak-alola") {
        tool_string += " In Alola";
        level_conditions.push(<FaCircleQuestion />);
      }

      if (
        pokemon.name === "weezing-galar" ||
        pokemon.name === "mr-mime-galar"
      ) {
        tool_string += " In Galar";
        level_conditions.push(<FaCircleQuestion />);
      }

      if (
        pokemon.name === "typhlosion-hisui" ||
        pokemon.name === "samurott-hisui" ||
        pokemon.name === "braviary-hisui" ||
        pokemon.name === "avalugg-hisui" ||
        pokemon.name === "decidueye-hisui"
      ) {
        tool_string += " In Hisui";
        level_conditions.push(<FaCircleQuestion />);
      }

      detail = (
        <div className="detail-box group">
          Lvl. {evoDetail?.min_level ? "" : "+"}
          {level_conditions}
          {tool_string.length > 0 ? (
            <span className="hover-text group-hover:block">
              Level Up {tool_string}
            </span>
          ) : (
            <></>
          )}
        </div>
      );
    } else if (evoDetail?.trigger.name === "trade") {
      let item = null;
      let itemName = "";
      let evo_conditions = [];
      let tool_string = "Pokemon";

      if (evoDetail?.held_item) {
        item = await getResouceByUrl(evoDetail?.held_item.url);
        itemName = getEnglishName(item.names);
        tool_string += ` Holding ${itemName}`;
        evo_conditions.push(
          <img src={item.sprites.default} height={25} width={25}></img>
        );
      }
      if (evoDetail?.trade_species) {
        let pokemon_species = await getResouceByUrl(
          evoDetail?.trade_species.url
        );
        let pokemonName = getEnglishName(pokemon_species.names);
        let pokemon = await getResouceByUrl(
          pokemon_species.varieties[0].pokemon.url
        );
        tool_string += ` With ${pokemonName}`;
        evo_conditions.push(
          <img
            src={pokemon.sprites.other.home.front_default}
            height={30}
            width={30}
          ></img>
        );
      }
      detail = (
        <div className="detail-box group">
          Trade {evo_conditions}
          {tool_string.length > 0 ? (
            <span className="hover-text group-hover:block">
              Trade {tool_string}
            </span>
          ) : (
            <></>
          )}
        </div>
      );
    } else if (evoDetail?.trigger.name === "use-item") {
      const item =
        evoDetail?.item && (await getResouceByUrl(evoDetail?.item.url));
      let itemName = getEnglishName(item.names);
      let itemSprite = "";
      let evo_conditions = [];
      let tool_string = "";

      itemSprite = item.sprites.default ? item.sprites.default : "";

      if (pokemon.name === "slowbro-galar") {
        itemSprite = "galarica_cuff.png";
      } else if (pokemon.name === "slowking-galar") {
        itemSprite = "galarica_wreath.png";
      } else if (pokemon.name === "ursaluna") {
        itemSprite = "peat_block.png";
        itemName = "Peat Block";
      } else if (pokemon.name === "kleavor") {
        itemSprite = "black_augurite.png";
        itemName = "Black Augurite";
      } else if (pokemon.name === "flapple") {
        itemSprite = "tart_apple.png";
      } else if (pokemon.name === "appletun") {
        itemSprite = "sweet_apple.png";
      } else if (pokemon.name === "polteageist") {
        itemSprite = "cracked_pot.png";
      } else if (pokemon.name === "armarouge") {
        itemSprite = "auspicious_armor.png";
      } else if (pokemon.name === "ceruledge") {
        itemSprite = "malicious_armor.png";
      }

      evo_conditions.push(<img src={itemSprite} height={25} width={25}></img>);
      tool_string += `Use ${itemName}`;

      if (evoDetail?.gender) {
        if (evoDetail?.gender === 1) {
          tool_string += " Female Only";
          evo_conditions.push(<>♀</>);
        } else if (evoDetail?.gender === 2) {
          tool_string += " Male Only";
          evo_conditions.push(<>♂</>);
        }
      }

      if (
        pokemon.name === "raichu-alola" ||
        pokemon.name === "exeggutor-alola"
      ) {
        tool_string += " In Alola";
        evo_conditions.push(<FaCircleQuestion />);
      }

      if (pokemon.name === "lilligant-hisui") {
        tool_string += " In Hisui";
        evo_conditions.push(<FaCircleQuestion />);
      }

      detail = (
        <div className="detail-box group">
          Use {evo_conditions}
          <span className="hover-text group-hover:block">{tool_string}</span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "take-damage") {
      detail = (
        <div className="detail-box group">
          Take Damage
          <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Take 49+ Damage In One Battle And Walk Under Sculpture In Dusty Bowl
          </span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "shed") {
      detail = (
        <div className="detail-box group">
          Shed <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Level Up w/ Free Space In Party
          </span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "three-critical-hits") {
      detail = (
        <div className="detail-box group">
          3x Crits
          <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Get 3 Critical Hits In One Battle
          </span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "agile-style-move") {
      let move = null;
      let moveName = "";
      let evo_conditions = [];
      let tool_string = "";

      move =
        evoDetail?.known_move &&
        (await getResouceByUrl(evoDetail?.known_move.url));
      moveName = getEnglishName(move.names);
      tool_string += `Use Agile Style ${moveName} 20 Times`;
      evo_conditions.push(<FaHandFist />);

      detail = (
        <div className="detail-box group">
          Agile Style{evo_conditions}
          <span className="hover-text group-hover:block">{tool_string}</span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "spin") {
      detail = (
        <div className="detail-box group">
          Spin
          <FaArrowsRotate />
          <span className="hover-text group-hover:block">
            Spin Holding Sweet Item
          </span>
        </div>
      );
    } else if (evoDetail?.trigger.name === "recoil-damage") {
      detail = (
        <div className="detail-box group">
          Recoil
          <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Take 300 Damage From Your Moves Without Fainting
          </span>
        </div>
      );
    }

    //account for annihalape's special evolution requirement
    if (pokemon.name === "annihilape") {
      detail = (
        <div className="group detail-box">
          Rage Fist <FaCircleQuestion />
          <span className="group-hover:block hover-text">
            Use Rage Fist 20 Times
          </span>
        </div>
      );
    }
    //account for probopass's special evolution requirement
    else if (pokemon.name === "probopass") {
      let item = await getResouceByUrl("https://pokeapi.co/api/v2/item/83/");
      let itemName = getEnglishName(item.names);

      detail = (
        <div className="group detail-box">
          Use <img src={item.sprites.default} height={25} width={25}></img>
          <span className="group-hover:block hover-text">Use {itemName}</span>
        </div>
      );
    }
    //account for electrode-hisui's special evolution requirement
    else if (pokemon.name === "electrode-hisui") {
      let item = await getResouceByUrl("https://pokeapi.co/api/v2/item/85/");
      let itemName = getEnglishName(item.names);

      detail = (
        <div className="group detail-box">
          Use <img src={item.sprites.default} height={25} width={25}></img>
          <span className="group-hover:block hover-text">Use {itemName}</span>
        </div>
      );
    }
    //account for overqwil's special evolution requirement
    else if (pokemon.name === "overqwil") {
      detail = (
        <div className="group detail-box">
          Lvl. + <FaHandFist />
          <span className="group-hover:block hover-text">
            Level Up Knowing Barb Barrage
          </span>
        </div>
      );
    }
    //account for dipplin's special evolution requirement
    else if (pokemon.name === "dipplin") {
      let itemImg = "syrupy_apple.png";
      let itemName = "Syrupy Apple";

      detail = (
        <div className="detail-box group">
          Use <img src={itemImg} height={25} width={25}></img>
          <span className="group-hover:block hover-text">Use {itemName}</span>
        </div>
      );
    }
    //account for hydrapple's special evolution requirement
    else if (pokemon.name === "hydrapple") {
      detail = (
        <div className="detail-box group">
          Lvl. + <FaHandFist />
          <span className="hover-text group-hover:block">
            Level Up Knowing Dragon Cheer
          </span>
        </div>
      );
    }
    //account for archaludon's special evolution requirement
    else if (pokemon.name === "archaludon") {
      let itemImg = `metal_alloy.png`;
      let itemName = "Metal Alloy";

      detail = (
        <div className="detail-box group">
          Use <img src={itemImg} height={25} width={25}></img>
          <span className="hover-text group-hover:block">Use {itemName}</span>
        </div>
      );
    }
    //account for urshifu-single-strike's special evolution requirement
    else if (pokemon.name === "urshifu-single-strike") {
      let itemImg = `scroll_of_darkness.png`;
      let itemName = "Scroll of Darkness";

      detail = (
        <div className="detail-box group">
          Use <img src={itemImg} height={25} width={25}></img>
          <span className="hover-text group-hover:block">Use {itemName}</span>
        </div>
      );
    }
    //account for urshifu-rapid-strike's special evolution requirement
    else if (pokemon.name === "urshifu-rapid-strike") {
      let itemImg = `scroll_of_waters.png`;
      let itemName = "Scroll of Waters";

      detail = (
        <div className="detail-box group">
          Use <img src={itemImg} height={25} width={25}></img>
          <span className="hover-text group-hover:block">Use {itemName}</span>
        </div>
      );
    }
    //account for pawmot, brambleghast, rabsca special evolution requirement
    else if (
      pokemon.name === "pawmot" ||
      pokemon.name === "brambleghast" ||
      pokemon.name === "rabsca"
    ) {
      detail = (
        <div className="detail-box group">
          Walk <FaCircleQuestion />
          <span className="hover-text">Walk 1000 Steps In Overworld</span>
        </div>
      );
    }
    //account for maushold special evolution requirement
    else if (pokemon.name === "maushold") {
      detail = (
        <div className="detail-box group">Lvl. {evoDetail?.min_level}</div>
      );
    }
    //account for palafin special evolution requirement
    else if (pokemon.name === "palafin") {
      detail = (
        <div className="detail-box group">
          Lvl. {evoDetail?.min_level}
          <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Have Another Player In The Union Circle
          </span>
        </div>
      );
    }
    //account for kingambit special evolution requirement
    else if (pokemon.name === "kingambit") {
      let itemImg = `leaders_crest.png`;
      detail = (
        <div className="detail-box group">
          3x K.O <img src={itemImg} height={25} width={25}></img>
          <span className="hover-text group-hover:block">
            Defeat 3 Bisharp That Are Holding A Leader's Crest
          </span>
        </div>
      );
    }
    //account for gholdengo special evolution requirement
    else if (pokemon.name === "gholdengo") {
      detail = (
        <div className="detail-box group">
          Coins <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Collect 999 Gimmighoul Coins
          </span>
        </div>
      );
    }
    //account for sinistcha special evolution requirement
    else if (pokemon.name === "sinistcha") {
      let itemImg = `unremarkable_teacup.png`;
      let itemName = "Unremarkable Teacup";

      detail = (
        <div className="detail-box group">
          Use <img src={itemImg} height={25} width={25}></img>
          <span className="hover-text group-hover:block">Use {itemName}</span>
        </div>
      );
    }
    //account for manaphy special evolution requirement
    else if (pokemon.name === "manaphy") {
      detail = (
        <div className="detail-box group">
          Breed <FaCircleQuestion />
          <span className="hover-text group-hover:block">
            Phione Is Aquired By Breeding Manaphy, But Cannot Evolve To It
          </span>
        </div>
      );
    }
    //account for crabominable special evolution requirement
    else if (pokemon.name === "crabominable") {
      let item = await getResouceByUrl("https://pokeapi.co/api/v2/item/885/");
      let itemName = getEnglishName(item.names);

      detail = (
        <div className="detail-box group">
          Use <img src={item.sprites.default} height={25} width={25}></img>
          <span className="hover-text group-hover:block">Use {itemName}</span>
        </div>
      );
    }

    setDetailLoading(false);
    return detail;
  };

  return !detailLoading && <div>{detailData}</div>;
};

export default PokemonEvoDetail;
