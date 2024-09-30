"use strict";

import { useState } from "react";
import { useEffect } from "react";
// import { searchGifUrl, trendingGifsUrl } from "./api";

function App() {
  const [gifs, setGifs] = useState();
  const [isLoading, setIslonading] = useState(true);
  const [searchField, setSearchField] = useState("");

  const [searching, setSearching] = useState(false);
  console.log(searching);
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);

  const searchGifUrl = `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
  const trendingGifsUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips";

  async function handleOnClickSearch() {
    try {
      const searchedList = await fetch(searchGifUrl);
      const searchedListData = await searchedList.json();

      setGifs(searchedListData.data);
    } catch (err) {
      console.log(err.message);
    }

    setSearching(true);
    setSearchInput("");
    console.log(gifs.length);
  }
  async function handleCloseSearch() {
    try {
      const trending = await fetch(trendingGifsUrl);
      const trendingData = await trending.json();
      setGifs(trendingData.data);
    } catch (err) {
      console.log(err.message);
    }
    setSearching(false);
  }

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const trending = await fetch(trendingGifsUrl);
        const trendingData = await trending.json();
        setGifs(trendingData.data);
        setIslonading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchGifs();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Logo />
      <Search
        handleOnClickSearch={handleOnClickSearch}
        handleCloseSearch={handleCloseSearch}
        searching={searching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchField={setSearchField}
      />
      <ResultsList gifs={gifs} searchField={searchField} />
    </>
  );
}

function Logo() {
  return (
    <div className="background ">
      <span className="logo">Giphy</span>
    </div>
  );
}

function Search({
  handleOnClickSearch,
  handleCloseSearch,
  searching,
  searchInput,
  setSearchInput,
  setSearchField,
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
      {searching ? (
        <div className="closeSearchContainer" onClick={handleCloseSearch}>
          <button className="closeSearch crossButton">
            Close search results X
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

function ResultsList({ gifs, searchField }) {
  return (
    <>
      {gifs.length ? (
        <div className="resultsContainer">
          {gifs.map((gif) => (
            <Result key={gif.id} gif={gif} />
          ))}
        </div>
      ) : (
        <p>No results for {searchField}</p>
      )}
    </>
  );
}

function Result({ gif }) {
  return (
    <li>
      <img className="gifContainer" src={gif.images.original.url} />
    </li>
  );
}
export default App;
