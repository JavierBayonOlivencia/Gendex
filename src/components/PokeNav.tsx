import { Action, InitialState } from "../hooks/usePokeNav";

type NavLink = {
    linkName: string,
}

type Props = {
    state: InitialState,
    dispatch: React.Dispatch<Action>,
}

const pokeNavLinks: NavLink[] = [
    { linkName: "Info" },
    { linkName: "Area" },
    { linkName: "Forms" },
]

export default function PokeNav({ state, dispatch } : Props) {
  const { activeState } = state;

  return (
    <nav className="nav">
      <ul className="nav__links">
        {pokeNavLinks.map((link) => (
            <li key={link.linkName}>
                <button
                    className={`btn btn--link ${link.linkName === activeState && "btn--link-active"}`}
                    onClick={() => dispatch({ type: `SET_${link.linkName.toUpperCase()}`, payload: true })}
                >
                    {link.linkName}
                </button>
            </li>
        ))}
      </ul>
    </nav>
  );
}
