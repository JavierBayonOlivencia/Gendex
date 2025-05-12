import { Link } from "react-router-dom";

export default function Header() {
    // const location = useLocation();
    // const isGeneration = location.pathname.split("/")[1] === "generation";
    // console.log(isGeneration);
    // Add PokeDXNav if the page location is generation

    return (
        <header className="header">
            <Link className="logo" to="/">GenDex</Link>
        </header>
    )
}