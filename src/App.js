"use strict";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Logo />
      <Search />
      <ResultsList />
      <Result/>
    </>
  );
}

const [gifs, setGifs] = useState();
useEffect(
  async function fetchGifs() {
    try{
      const trending = await fetch(
        "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
      );
      const trendingData = await trending.json();
      setFigs(trendingData.images.url)
    } catch {
      if (!data) {
        return "Service is unvailable"
      }
    }
  } 
)

function Logo() {
  return (
    <div className="background ">
      <span className="logo">Giphy</span>
    </div>
  );
}
function Search() {
  return (
    <div className="searchContainer">
      <input className="search" />
      <button className="searchButton">Search</button>
    </div>
  );
}
function ResultsList() {
  return <div className="resultsContainer">{trendingData.map(data => )}</div>;
}

function Result() {
  return <div></div>
}
export default App;

