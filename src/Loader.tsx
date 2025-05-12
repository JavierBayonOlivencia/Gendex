import logo from "./assets/pokeballs/Vector.png";

 export default function Loader() {
    return (
        <div className="loader">
          <img className="loader__image" src={logo} alt="" />  
        </div> 
    )
};