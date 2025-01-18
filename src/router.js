// // Routing
// // State
// //  - Page
// //  - PreviusPage
// //  - NextPage
// // Actions
// //  - goBack
// //  - goForward
// //  - goToPage
// Data
// get CurrentPage

import { useState } from "react";

// // Use case
// // 1. You are on trending gifs. State: previous Page: null, page: Trending  , nextPage: null
// // 2. go to Search Pages        State: previous Page: Trending, page: Search, nextPage: null
// // 3. go to Detailed Gif        State: previous Page: Search, page: Detailed, nextPage: null

// let pages = [];
// // after you see trending
// pages = ["Trending"];

// // 2. to search
// pages = ["Trending", "Search"];

// // 3. to search
// //  [-1]
// let pages = ["Trending", "Search"];
// let activePageIndex = -1;

// // ['Trending', 'Search'];
// actviePageIndex = -1;
// // activePage = page[activeiIndex];

// // ACTION GO BACK
// actviePageIndex = activePageIndex - 1;

// // ACTION GO FORWARD activePageIndex
// activePageIndex = activePageIndex + 1;

// // ACTION goToPage
// pages = ["Trending", "Search", "Detailed"];
// activePageIndex = -2;

// // remove all items with index more the activePageIndex
// // add page to the end of pages;

// // ACTIVE

export const RouterPageNameDict = {
  List: "list",
  Favourite: "favourite",
  Detail: "detail", // this route is route with *. Will implement in the end
};

let routerPages = [];
let activePageIndex = 0;
// [][0] = undefined

function goBack() {
  console.log("goBack!");
  if (activePageIndex === 0) return;
  activePageIndex = activePageIndex - 1;
}
function goFroward() {
  if (activePageIndex === routerPages.length - 1) return;
  activePageIndex = activePageIndex + 1;
}

function getActivePage() {
  return routerPages[activePageIndex];
}

function goToPage(page, params) {
  let newPages = [];
  for (let i = 0; i <= activePageIndex; i++) {
    newPages.push(routerPages[i]);
  }
  newPages.push({ page: page, params });
  routerPages = newPages;
  activePageIndex = routerPages.length - 1;

  // ********
  // routerPages = [RouterPageDict.Detail, RouterPageDict.Favorite];
  // activePageIndex = 1; /
  // go to page Search = current page Search, previous page Favorite
  // ********
  // routerPages = [RouterPageDict.Detail, RouterPageDict.Favorite, RouterPageDict.Search];
  // go back
  // ******** 1
  // routerPages = [RouterPageDict.Detail, RouterPageDict.Favorite, RouterPageDict.Search];
  // goToPage Trending
  // ********
  // routerPages = [RouterPageDict.Detail, RouterPageDict.Favorite, RouterPageDict.Trending];
}

// console.log(routerPages[activePageIndex]); // {page: <pageName>, args: <arguments>}

// BEFORE
// let routerPages = []; [RouterPageDict.Detail, RouterPageDict.Favorite, RouterPageDict.Search]

// AFTER let routerPages = []; [{page: RouterPageDict.Detail, params: {gifId: 100}}, {page: RouterPageDict.Favorite, params: {}}]

/**
 * !!TESTS!!!
 *
 */
// routerPages = [
//   { page: RouterPageNameDict.Detail, params: { gifId: 100 } },
//   { page: RouterPageNameDict.Favorite, params: {} },
//   { page: RouterPageNameDict.Detail, params: { gifId: 100 } },
// ];
// activePageIndex = 2;
// goBack();
// goBack();
// goToPage(RouterPageNameDict.Trending, {
//   mysuperpuperParam: "here you should see my super puper params",
// });

// console.log("activePage", routerPages[activePageIndex]);

// console.log("pages", routerPages);
// console.log("activePageIndex", activePageIndex);

// console.log("activePage", routerPages[activePageIndex]);
// console.log("activePage", getActivePage());

export function useRouter() {
  const [routerPagesState, setRouterPagesState] = useState(routerPages);
  const [activePageIndexState, setActivePageIndexState] =
    useState(activePageIndex);

  return {
    activePage: routerPagesState[activePageIndexState],
    goBack: () => {
      goBack();
      setRouterPagesState(routerPages);
      setActivePageIndexState(activePageIndex);
    },
    goForward: () => {
      goFroward();
      setRouterPagesState(routerPages);
      setActivePageIndexState(activePageIndex);
    },
    goToPage: (page, params) => {
      console.log("goToPage", page, params);

      goToPage(page, params);
      setRouterPagesState(routerPages);
      setActivePageIndexState(activePageIndex);
      console.log("activePage", getActivePage());
    },
  };
}
