import { usePokemonContext } from "../context/PokemonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const PokemonFormBar = () => {
  const {
    varietyIndex,
    formIndex,
    getEnglishName,
    currentForm,
    varietiesList,
    formsList,
    speciesData,
    updateVariety,
    updateForm,
  } = usePokemonContext();

  const getFormName = () => {
    if (varietiesList && formsList) {
      let name =
        getEnglishName(currentForm?.form_names).length > 0
          ? getEnglishName(currentForm?.form_names)
          : getEnglishName(speciesData?.names);
      let formName =
        varietiesList.length > 1 || (formsList && formsList.length > 1) ? (
          varietiesList.length > formsList.length ? (
            <div className="formsList">
              {name} (Form {varietyIndex + 1} of {varietiesList.length})
            </div>
          ) : (
            <div className="formsList">
              {name} (Form {formIndex + 1} of {formsList.length})
            </div>
          )
        ) : (
          <div className="forms">No Alternate Forms</div>
        );

      return formName;
    }
    return;
  };

  const handlePrevVarietyClick = () => {
    if (varietiesList && formsList && varietiesList.length > formsList.length) {
      if (varietyIndex > 0) {
        updateVariety(varietyIndex - 1);
      }
    } else {
      if (formIndex > 0) {
        updateForm(formIndex - 1);
      }
    }
  };

  const handleNextVarietyClick = () => {
    if (varietiesList && formsList && varietiesList.length > formsList.length) {
      if (varietyIndex + 1 < varietiesList.length) {
        updateVariety(varietyIndex + 1);
      }
    } else {
      if (formsList && formIndex + 1 < formsList.length) {
        updateForm(formIndex + 1);
      }
    }
  };

  const disablePrevButton = () => {
    if (varietiesList && formsList && varietiesList.length > formsList.length) {
      return varietyIndex === 0;
    } else {
      return formIndex === 0;
    }
  };

  const disableNextButton = () => {
    if (varietiesList && formsList && varietiesList.length > formsList.length) {
      return varietyIndex === varietiesList.length - 1;
    } else {
      return formsList && formIndex === formsList.length - 1;
    }
  };

  return (
    <section className="flex justify-between items-center w-full max-w-[400px] dark:text-slate-200 font-semibold text-xl dark:bg-black/50 bg-white/50 sm:rounded-lg">
      <button
        type="button"
        onClick={handlePrevVarietyClick}
        disabled={disablePrevButton()}
        className="disabled:text-slate-500 dark:disabled:text-slate-400 flex items-center justify-center hover:scale-110 disabled:hover:scale-100 active:scale-95 transition-all"
      >
        <FontAwesomeIcon icon={faCaretLeft} className={"w-[30px] h-[30px]"} />
      </button>
      <h3 className="w-[350px] text-center text-sm">{getFormName()}</h3>
      <button
        type="button"
        onClick={handleNextVarietyClick}
        disabled={disableNextButton()}
        className="disabled:text-slate-500 dark:disabled:text-slate-400 flex items-center justify-center hover:scale-110 disabled:hover:scale-100 active:scale-95 transition-all"
      >
        <FontAwesomeIcon icon={faCaretRight} className="w-[30px] h-[30px]" />
      </button>
    </section>
  );
};

export default PokemonFormBar;
