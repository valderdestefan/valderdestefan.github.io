import InfiniteScroll from "react-infinite-scroll-component";
import Result from "./Result";

export default function ResultsList({
  gifs,
  searchField,
  onScrollBottom,
  onClickOnGif,
  searching,
}) {
  return (
    <>
      {searching ? (
        <div className="title-close-container">
          <p className="favourite-title">Results</p>
          <button className="close-x">X</button>
        </div>
      ) : (
        <></>
      )}
      {gifs.length ? (
        <div className="resultsContainer">
          <InfiniteScroll
            dataLength={gifs.length}
            next={() => onScrollBottom()}
            hasMore={true}
            loader={<p>Loading...</p>}
          >
            {gifs.map((gif) => (
              <Result key={gif.id} gif={gif} onClick={onClickOnGif} />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <p>No results for {searchField}</p>
      )}
    </>
  );
}
