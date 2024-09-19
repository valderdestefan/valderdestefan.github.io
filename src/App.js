"use strict";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [gifs, setGifs] = useState();

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const trending = await fetch(
          "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
        );
        const trendingData = await trending.json();
        console.log(trendingData.data);
        setGifs(trendingData.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchGifs();
  }, []);

  return (
    <>
      <Logo />
      <Search />
      <ResultsList />
      <Result gifs={gifs} />
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
function Search() {
  return (
    <div className="searchContainer">
      <input className="search" />
      <button className="searchButton">Search</button>
    </div>
  );
}
// Тут плачется что gif никогда не был прочитан, я чуть в чатджпт спрашивал - говорит из-за неправильной работы с массивом.
function ResultsList({ gifs }) {
  return (
    <>
      {gifs?.map((gif) => (
        <div className="resultsContainer">
          <Result />
        </div>
      ))}
    </>
  );
}
// Тут я пытаюсь массив достать как-то, могу достать в единичном экземпляре но чтобы все 25 штук - не выходит.
// Между data и images есть звено где эти 25 штук есть, и я не знаю что написать чтобы они выбрались. Уже думал каунт добавлять чтобы тригеррило +1, но тогда же будет куча запросов верно?
function Result({ gifs }) {
  return (
    <li>
      <img src={gifs[0].images.original.url} />
    </li>
  );
}
export default App;
