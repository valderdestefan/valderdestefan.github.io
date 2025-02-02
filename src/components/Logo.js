export default function Logo({ onClick }) {
  return (
    <div className="background ">
      {/* <span className="logo" onClick={() => goToPage(RouterPageNameDict.List)}> */}
      <span className="logo" onClick={onClick}>
        Giphy
      </span>
    </div>
  );
}
