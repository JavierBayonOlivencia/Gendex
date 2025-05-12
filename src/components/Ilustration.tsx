type Props = {
  pokemonName: string | null;
  pokemonId: number | null;
  info: {
    sprites: {
      other: {
        ["official-artwork"]: {
          front_default: string;
        };
      };
    };
  } | undefined;
};

export default function Ilustration({ pokemonName, pokemonId, info }: Props) {

  return (
    <div className="content__image content__image--hero">
      { info ?
        <>
          <img
            src={info.sprites.other["official-artwork"].front_default}
            alt={`${pokemonName} oficial art.`}
          />
          <h1 className="content__title-small">
            <span>NO.{pokemonId?.toString().padStart(3, "0")}</span>/
            {pokemonName}
          </h1>
        </>
        : <h1 className="content__title-large">Choose A Pokemon!</h1>
      }
    </div>
  );
}
