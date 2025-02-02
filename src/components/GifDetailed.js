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
    <>
      <div className="gifContainerStandalone">
        <p className="gifName">{gifName}</p>

        <img src={openedGif.images.original.url} alt={openedGif.title}></img>
      </div>
      <div className="likeAndBack">
        {!isFavorite ? (
          <button
            className="button button-like"
            onClick={() => onClickOnLike(openedGif)}
          >
            Like ❤️
          </button>
        ) : (
          <button
            className="button button-dislike"
            onClick={() => onClickOnDislike(openedGif.id)}
          >
            Dislike 👎
          </button>
        )}
        <button className="returnButton" onClick={handleBackButton}>
          Back
        </button>
      </div>
    </>
  );
}
