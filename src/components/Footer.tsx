import pokeball from '../assets/pokeballs/Vector.png';

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer__content">
          <span className="footer__time">@2025</span>
          <img className="footer__image" src={pokeball} alt="Base Red Pokeball" />
          <span className="footer__time">Pokedex</span>
        </div>
        <ul className="nav__links">
          <li><a className="btn btn--link" href="#">GitHub</a></li>
          <li><a className="btn btn--link" href="#">LinktIn</a></li>
        </ul>
      </footer>
    )
}