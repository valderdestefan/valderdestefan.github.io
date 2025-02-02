import { useState } from "react";
export default function Header({
  handleOnClickSearch,
  onClickOnFavouriteGifList,
}) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <div className="searchContainer">
        <input
          className="search"
          value={searchInput}
          placeholder="Search GIFs..."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="button button-search"
          onClick={() => {
            if (searchInput !== "") {
              handleOnClickSearch(searchInput);
              setSearchInput("");
            }
          }}
        >
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
    </>
  );
}
