export default function Result({ gif, onClick }) {
  const gifImage = gif.images.original.url;
  return (
    <div>
      <img
        onClick={() => onClick(gif)}
        className="gifContainer gifContainerImg"
        src={gifImage}
        alt={gif.title}
      />
    </div>
  );
}
