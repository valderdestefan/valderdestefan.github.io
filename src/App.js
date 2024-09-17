"use strict";

function App() {
  return (
    <>
      <Logo />
      <Search />
      <Results />
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
function Results() {
  return (
    <div className="resultsContainer">
      <div>Result 1</div>
      <div>Result 2</div>
      <div>Result 3</div>
      <div>Result 4</div>
      <div>Result 5</div>
      <div>Result 6</div>
      <div>Result 7</div>
      <div>Result 8</div>
      <div>Result 9</div>
      <div>Result 10</div>
      <div>Result 11</div>
      <div>Result 12</div>
      <div>Result 13</div>
      <div>Result 14</div>
    </div>
  );
}
export default App;
