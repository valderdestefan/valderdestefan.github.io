import InfiniteScroll from "react-infinite-scroll-component";
import Result from "./Result";

export default function ResultsList({
  gifs,
  searchField,
  onScrollBottom,
  onClickOnGif,
  searching,
  handleBackButton,
}) {
  return (
    <>
      {searching && gifs.length ? (
        <div className="titleCloseContainer titleCloseContainer-search">
          <p className="favourite-title">Results for "{searchField}"</p>
          <button className="close-x" onClick={handleBackButton}>
            X
          </button>
        </div>
      ) : null}
      {gifs.length ? (
        <InfiniteScroll
          dataLength={gifs.length}
          className="resultsContainer"
          next={() => onScrollBottom()}
          hasMore={true}
          loader={<p>Loading...</p>}
        >
          {gifs.map((gif) => (
            <Result key={gif.id} gif={gif} onClick={onClickOnGif} />
          ))}
        </InfiniteScroll>
      ) : (
        <div className="titleCloseContainer">
          <p className="favourite-title">No results for "{searchField}"</p>
          <button className="close-x" onClick={handleBackButton}>
            X
          </button>
        </div>
      )}
    </>
  );
}
