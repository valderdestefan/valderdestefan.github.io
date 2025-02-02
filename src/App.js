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

  // activePage {
  //  page: string;
  //  params: { [key: string]: any }
  // }

  // example list; activePage {
  //  page: 'list';
  //  params: {}
  // }

  // example Detail; activePage {
  //  page: 'detail';
  //  params: { gif: {id: 'dfdf', name: 'name', image: '',} }
  // }

  const { activePage, goBack, goForward, goToPage } = useRouter();

  let page = null;
  console.log("active page", activePage);

  // initial value:  just after you reload the browser page;
  if (activePage === undefined) {
    page = <ListPage goToPage={goToPage} />;
  }

  if (activePage?.page === RouterPageNameDict.List) {
    page = <ListPage goToPage={goToPage} />;
  }

  if (activePage?.page === RouterPageNameDict.Favourite) {
    page = (
      <FavouriteListPage
        goBack={goBack}
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
      <Logo onClick={() => goToPage(RouterPageNameDict.List)} />
      {page}
    </>
  );
}

// utils
const getGifsBySearch = async function (searchInput) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&q=${searchInput}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
  const searchedList = await fetch(url);
  const searchedListData = await searchedList.json();
  return searchedListData;
};

function FavouriteListPage({ goToPage, favouriteGifs, hasFavorites, goBack }) {
  return (
    <FavouriteGifs
      goBack={goBack}
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

  const trendingGifsUrl =
    "https://api.giphy.com/v1/gifs/trending?api_key=joJzQZk80ep6DF1ocKX2saSSNGU69GYg&limit=25&offset=0&rating=g&bundle=messaging_non_clips";

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

    searching
      ? setGifs([...gifs, ...nextDataSearch.data])
      : setGifs([...gifs, ...nextData.data]);
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
    console.log("did somehting has happened?");
  }

  async function handleOnClickSearch(searchInput) {
    try {
      setSearchField(searchInput);
      const searchedListData = await getGifsBySearch(searchInput);
      console.log("searchField", searchedListData);
      console.log("searchFieldData", searchedListData.data);

      setGifs(searchedListData.data);
    } catch (err) {
      console.log(err.message);
    }

    setSearching(true);
    console.log(gifs.length);
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Header
        handleOnClickSearch={handleOnClickSearch}
        searching={searching}
        // setSearchField={setSearchField}
        // TODO MOVE FAVOURITE GIFS BUTTON
        onClickOnFavouriteGifList={() => goToPage(RouterPageNameDict.Favourite)}
      />
      <ResultsList
        handleBackButton={handleCloseSearch}
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

export default App;
