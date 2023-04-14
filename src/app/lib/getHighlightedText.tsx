export default function getHighlightedText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) => (
    <div
      className="whitespace-pre" // preserves newlines and spaces within an element. see: https://tailwindcss.com/docs/whitespace#pre
      key={index}
    >
      {part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          className=""
          style={{ color: "orange" }}
        >
          {part}
        </span>
      ) : (
        <span>{part}</span>
      )}
    </div>
  ));
}
