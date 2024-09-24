"use strict";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [gifs, setGifs] = useState();
  const [isLoading, setIslonading] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [searching, setSearching] = useState(false);
  console.log(searchField);
  function handleSetSearchfield() {
    searchField = setSearchField;
  }

  function handleOnClickSearch() {
    setSearching(!searching);
  }
  useEffect(() => {
    const fetchGifs = async () => {
      try {
        if (!searching) {
          const trending = await fetch(
            "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
          );
          const trendingData = await trending.json();
          setGifs(trendingData.data);
        } else if (searching) {
          const searchedList = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`
          );
          const searchedListData = await searchedList.json();
          setGifs(searchedListData.data);
        }

        setIslonading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchGifs();
  }, [searching]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Logo />
      <Search
        handleSetSearchfield={setSearchField}
        handleOnClickSearch={handleOnClickSearch}
      />
      <ResultsList gifs={gifs} />
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
function Search({ handleSetSearchfield, handleOnClickSearch }) {
  return (
    <div className="searchContainer">
      <input
        className="search"
        onChange={(e) => handleSetSearchfield(e.target.value)}
      />
      <button className="searchButton" onClick={handleOnClickSearch}>
        Search
      </button>
    </div>
  );
}

function ResultsList({ gifs }) {
  return (
    <>
      <div className="resultsContainer">
        {gifs.map((gif) => (
          <Result key={gif.id} gif={gif} />
        ))}
      </div>
    </>
  );
}

function Result({ gif }) {
  return (
    <li>
      <img src={gif.images.original.url} />
    </li>
  );
}
export default App;

// useEffect(() => {
//   const fetchGifs = async () => {
//     try {
//       const trending = await fetch(
//         "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
//       );
//       const trendingData = await trending.json();

//       setGifs(trendingData.data);
//       setIslonading(false);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   fetchGifs();
// }, []);
