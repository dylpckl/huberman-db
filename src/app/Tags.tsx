import { filterTags } from "./lib/filterTags";

interface Props {
  tags: string[];
}

export default function Tags({ tags }: Props) {
  const filteredTags = filterTags(tags);
  console.log(filteredTags)
  return (
    <ul className="flex flex-wrap gap-2">
      {filteredTags.map((t, index) => {
        return (
          <li
            key={index}
            className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 uppercase"
          >
            {t}
          </li>
        );
      })}
    </ul>
  );
}
