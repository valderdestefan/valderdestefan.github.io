"use strict";

import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [gifs, setGifs] = useState();
  const [isLoading, setIslonading] = useState(true);
  const [searchField, setSearchField] = useState("");

  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const searchGifUrl = `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
  const trendingGifsUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips";

  // const allData =
  //   "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg";
  // console.log(allData.length);

  async function handleOnClickSearch() {
    try {
      const searchedList = await fetch(searchGifUrl);
      const searchedListData = await searchedList.json();
      console.log("searchField", searchedListData);
      console.log("searchFieldData", searchedListData.data);
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

  async function handleInfinityScroll() {
    console.log("handle next");
    const offset = gifs.length;
    console.log(offset);

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`
    );
    const nextData = await response.json();

    const responseSearch = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`
    );

    const nextDataSearch = await responseSearch.json();

    !searching
      ? setGifs([...gifs, ...nextData.data])
      : setGifs([...gifs, ...nextDataSearch.data]);
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
      <ResultsList
        gifs={gifs}
        searchField={searchField}
        onScrollBottom={handleInfinityScroll}
        // allData={allData}
      />
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
        <div
          className="closeSearchContainer"
          onClick={handleCloseSearch}
          onKeyDown={handleCloseSearch}
        >
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

function ResultsList({ gifs, searchField, onScrollBottom }) {
  return (
    <>
      {gifs.length ? (
        <div className="resultsContainer">
          <InfiniteScroll
            dataLength={gifs.length}
            next={() => onScrollBottom()}
            hasMore={true}
            loader={<p>Loading...</p>}
          >
            {gifs.map((gif) => (
              <Result key={gif.id} gif={gif} />
            ))}
          </InfiniteScroll>
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
      <img
        className="gifContainer"
        src={gif.images.original.url}
        alt={gif.title}
      />
    </li>
  );
}
export default App;

function GifCard({ gif }) {
  return (
    <div>
      <img
        className="gifContainerStandalone"
        src={gif.images.original.url}
        alt={gif.title}
      ></img>
    </div>
  );
}
