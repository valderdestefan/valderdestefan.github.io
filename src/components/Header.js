export default function Header({
  handleOnClickSearch,
  handleBackButton,
  searching,
  searchInput,
  setSearchInput,
  setSearchField,
  onClickOnFavouriteGifList,
}) {
  return (
    <>
      <div className="searchContainer">
        <input
          className="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearchField(e.target.value);
          }}
        />
        <button className="searchButton" onClick={() => handleOnClickSearch()}>
          Search
        </button>
      </div>
      <div className="closeSearchContainer">
        <button
          className="favouriteGifsButton"
          onClick={() => onClickOnFavouriteGifList()}
        >
          Favourite Gifs
        </button>
      </div>
      {searching ? (
        <div
          className="closeSearchContainer"
          onClick={handleBackButton}
          onKeyDown={handleBackButton}
        >
          <button
            className="ReturnButton crossButton"
            onClick={handleBackButton}
          >
            Close search results X
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
