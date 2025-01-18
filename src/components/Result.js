export default function Result({ gif, onClick }) {
  const gifImage = gif.images.original.url;
  return (
    <li>
      <img
        onClick={() => onClick(gif)}
        className="gifContainer"
        src={gifImage}
        alt={gif.title}
      />
    </li>
  );
}
