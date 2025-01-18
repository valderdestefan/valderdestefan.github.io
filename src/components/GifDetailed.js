export default function GifDetailed({
  openedGif,
  handleBackButton,
  onClickOnLike,
  isFavorite,
  onClickOnDislike,
}) {
  const trimming = openedGif.title.indexOf("GIF");
  const gifName = openedGif.title.substring(0, trimming);
  //   console.log("i am here", openedGif);
  //   console.log("gifCheck", handleGifCheck(openedGif.id));

  return (
    <div className="gifContainerStandalone">
      <p className="gifName">{gifName}</p>

      <img src={openedGif.images.original.url} alt={openedGif.title}></img>
      {!isFavorite ? (
        <button
          className="searchButton"
          onClick={() => onClickOnLike(openedGif)}
        >
          Like
        </button>
      ) : (
        <button
          className="searchButton"
          onClick={() => onClickOnDislike(openedGif.id)}
        >
          Dislike
        </button>
      )}

      <button className="ReturnButton" onClick={handleBackButton}>
        Back
      </button>
    </div>
  );
}
