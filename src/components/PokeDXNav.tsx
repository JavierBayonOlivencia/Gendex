import { Action } from "../hooks/usePokeNav";
import extractIdFromUrl from "../utils/extractIdFromUrl";

interface Species {
  name: string;
  url: string;
}

interface Props {
  activeLink: number | null;
  setActiveLink: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  isSelected: boolean;
  dispatch: React.Dispatch<Action>;
  species: Species[] | undefined;
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<{ 
      selectedPokemonId: number | null;
      selectedPokemonName: string | null;
    }>
  >;
};

export default function PokeDXNav({
  activeLink,
  setActiveLink,
  isSelected,
  dispatch,
  species,
  setSelectedPokemon,
}: Props) {
  const speciesOrder = [...(species || [])].sort((a: Species, b: Species) => {
    return extractIdFromUrl(a.url) - extractIdFromUrl(b.url);
  });


  function handleClick(name: string, id: number) {
    dispatch({ type: "SET_SELECTED", payload: true });
    setSelectedPokemon({ selectedPokemonId: id, selectedPokemonName: name });
    setActiveLink(id);
  };

  return (
    <aside className={`section__nav ${!isSelected && "section__nav--active"}`}>
      <ul className="section__nav__links">
        {speciesOrder?.map(({ name, url }) => {
          const id = extractIdFromUrl(url);
          const isActive = activeLink === id;

          return (
            <li key={`${name}-${id}`} className={`nav__link ${isActive ? "nav__link--active" : ""}`}>
              <button
                onClick={() => handleClick(name, id)}
                className="btn btn--link"
              >
                <span>NO.{id.toString().padStart(3, "0")}</span>/
                {name}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  );
}