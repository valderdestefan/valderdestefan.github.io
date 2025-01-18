import Result from "./Result";

export default function FavouriteGifs({
  listOfVaouriteGifs,
  onClickOnGif,
  hasFavorites,
}) {
  return (
    <>
      <div className="title-close-container">
        <p className="favourite-title">Favourite Gifs</p>
        <button>X</button>
      </div>

      {hasFavorites ? (
        <div className="resultsContainer">
          {listOfVaouriteGifs.map((gif) => (
            <Result key={gif.id} gif={gif} onClick={onClickOnGif} />
          ))}
        </div>
      ) : (
        <p>Oops... maybe you want to add something here?</p>
      )}
    </>
  );
}
