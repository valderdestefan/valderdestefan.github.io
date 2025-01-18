"use strict";
import { useReducer, useState } from "react";
import { useEffect } from "react";
import React from "react";
import { useRouter, RouterPageNameDict } from "./router";
import { getList as getFavoriteList, setList, getList } from "./data/favorite";
import Header from "./components/Header";
import Logo from "./components/Logo";
import ResultsList from "./components/ResultList";
import FavouriteGifs from "./components/FavouriteGifs";
import GifDetailed from "./components/GifDetailed";

const initialState = getList();

function reducer(state, action) {
  switch (action.type) {
    case "setList": {
      return action.payload;
    }
    case "addGif": {
      const alreadyExists = state.some((gif) => gif.id === action.payload.id);
      if (alreadyExists) return state;
      return [...state, action.payload];
    }
    case "deleteGifById": {
      const newList = state.filter((item) => item.id !== action.payload);
      return newList;
    }
    default:
      return state;
  }
}

function App() {
  const [list, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (list === initialState) {
      return;
    }
    console.log("List of gifs");
    setList(list || []);
  }, [list]);

  function handleDeleteFavourite(gif) {
    console.log("CONSOLE LOG", gif);
    dispatch({ type: "deleteGifById", payload: gif });
  }
  function handleAddFavourite(gif) {
    dispatch({ type: "addGif", payload: gif });
  }

  console.log(getFavoriteList());

  const { activePage, goBack, goForward, goToPage } = useRouter();

  let page = <ListPage goToPage={goToPage} />;

  if (activePage === undefined) {
    page = <ListPage goToPage={goToPage} />;
  }

  if (activePage?.page === RouterPageNameDict.List) {
    page = <ListPage goToPage={goToPage} />;
  }
  // TO EXPLAIN ONE MORE TIME BY LEXA   !!!!!
  if (activePage?.page === RouterPageNameDict.Favourite) {
    page = (
      <FavouriteListPage
        goToPage={goToPage}
        favouriteGifs={list}
        hasFavorites={list.length}
      />
    );
  }

  if (activePage?.page === RouterPageNameDict.Detail) {
    page = (
      <DetailPage
        goBack={goBack}
        openedGif={activePage.params.gif}
        handleAddFavourite={handleAddFavourite}
        handleDeleteFavourite={handleDeleteFavourite}
        isFavorite={list.some((item) => item.id === activePage.params.gif.id)}
      />
    );
  }

  return (
    <>
      <Logo />
      {page}
    </>
  );
}

function FavouriteListPage({ goToPage, favouriteGifs, hasFavorites }) {
  return (
    <FavouriteGifs
      onClickOnGif={(gif) => goToPage(RouterPageNameDict.Detail, { gif })}
      listOfVaouriteGifs={favouriteGifs}
      hasFavorites={hasFavorites}
    />
  );
}

function ListPage({ goToPage }) {
  const [gifs, setGifs] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searching, setSearching] = useState(false);
  const [isLoading, setIslonading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const trendingGifsUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips";
  const searchGifUrl = `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;

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

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Header
        handleOnClickSearch={handleOnClickSearch}
        // TODO FIX BACK BUTTON
        handleBackButton={handleCloseSearch}
        searching={searching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchField={setSearchField}
        // TODO MOVE FAVOURITE GIFS BUTTON
        onClickOnFavouriteGifList={() => goToPage(RouterPageNameDict.Favourite)}
      />
      <ResultsList
        gifs={gifs}
        searchField={searchField}
        searching={searching}
        onScrollBottom={handleInfinityScroll}
        onClickOnGif={(gif) => goToPage(RouterPageNameDict.Detail, { gif })}
      />
    </div>
  );
}

function DetailPage({
  goBack,
  openedGif,
  handleAddFavourite,
  isFavorite,
  handleDeleteFavourite,
}) {
  return (
    <div>
      <GifDetailed
        openedGif={openedGif}
        handleBackButton={goBack}
        //ADD ANIMATION OF SUCCESS LIKE
        onClickOnLike={(gif) => {
          handleAddFavourite(gif);
        }}
        onClickOnDislike={(gif) => {
          handleDeleteFavourite(gif);
        }}
        isFavorite={isFavorite}
      />
      {/* <button onClick={goBack}>go back</button> */}
    </div>
  );
}

// function Root() {
//   const [gifs, setGifs] = useState();
//   const [isLoading, setIslonading] = useState(true);
//   const [searchField, setSearchField] = useState("");

//   const [searching, setSearching] = useState(false);
//   // const [searchInput, setSearchInput] = useState("");
//   const [activeGif, setActiveGif] = useState(false);
//   // const [openedGif, setOpenedGif] = useState(null);
// const [favouriteGif, setFavouriteGif] = useState([]);
// const [favouriteListOpened, setFavouriteListOpened] = useState(false);

// const searchGifUrl = `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
// const trendingGifsUrl =
//   "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips";
// console.log(favouriteListOpened);

// async function handleBackButton() {
//   try {
//     const trending = await fetch(trendingGifsUrl);
//     const trendingData = await trending.json();
//     setGifs(trendingData.data);
//   } catch (err) {
//     console.log(err.message);
//   }
//   setSearching(false);

//   if (activeGif) setActiveGif(false);
// }

// function handleClickOnGif(gif) {
//   setOpenedGif(gif);
//   console.log(openedGif);
//   setActiveGif(true);
// }

// function handleOpenFavouriteList() {
//   setFavouriteListOpened((prevState) => !prevState);
// }

// async function handleInfinityScroll() {
//   console.log("handle next");
//   const offset = gifs.length;
//   console.log(offset);

//   const response = await fetch(
//     `https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`
//   );
//   const nextData = await response.json();

//   const responseSearch = await fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchField}&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`
//   );

//   const nextDataSearch = await responseSearch.json();

//   !searching
//     ? setGifs([...gifs, ...nextData.data])
//     : setGifs([...gifs, ...nextDataSearch.data]);
// }

// useEffect(() => {
//   const fetchGifs = async () => {
//     try {
//       const trending = await fetch(trendingGifsUrl);
//       const trendingData = await trending.json();
//       setGifs(trendingData.data);
//       setIslonading(false);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   fetchGifs();
// }, []);

// if (isLoading) {
//   return <p>Loading</p>;
// }

// return (
//   <>
//     <Logo />
//     <Header
//       handleOnClickSearch={handleOnClickSearch}
//       handleBackButton={handleBackButton}
//       searching={searching}
//       searchInput={searchInput}
//       setSearchInput={setSearchInput}
//       setSearchField={setSearchField}
//       onClickOnFavouriteGifList={handleOpenFavouriteList}
//     />
//     {!activeGif ? (
//       <ResultsList
//         gifs={gifs}
//         searchField={searchField}
//         onScrollBottom={handleInfinityScroll}
//         onClickOnGif={handleClickOnGif}
//       />
//     ) : (
//       <GifDetailed
//         openedGif={openedGif}
//         // handleBackButton={handleBackButton}
//         // onClickOnLike={(gif) => addGif(gif)}
//       />
//     )}
//     {favouriteListOpened ? (
//       ""
//     ) : (
//       <FavouriteGifs
//         onClickOnGif={handleClickOnGif}
//         listOfVaouriteGifs={favouriteGif}
//       />
//     )}
//   </>
// );
// }

export default App;
