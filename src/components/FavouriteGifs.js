import Result from "./Result";

export default function FavouriteGifs({
  listOfVaouriteGifs,
  onClickOnGif,
  hasFavorites,
  goBack,
}) {
  return (
    <>
      <div className="favPageHeader">
        <p className="favTitle">Favourite Gifs</p>
        <button onClick={goBack} className="closeButton">
          X
        </button>
      </div>

      {hasFavorites ? (
        <div className="resultsContainer">
          {listOfVaouriteGifs.map((gif) => (
            <Result key={gif.id} gif={gif} onClick={onClickOnGif} />
          ))}
        </div>
      ) : (
        <div className="title-close-container">
          <p className="favourite-title">The list is empty</p>
        </div>
      )}
    </>
  );
}

{
  /* <div className="title-close-container">
  <p className="favourite-title">Favourite Gifs</p>
  <button onClick={goBack} className="returnButton">
    X
  </button>
</div>; */
}
