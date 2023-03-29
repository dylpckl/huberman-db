"use client";
import { useState } from "react";
import { videos } from "../app/lib/videos";
import Video from "./Video";

interface TagOption {
  id: number;
  value: string;
  checked: boolean;
}

interface Tag {
  id: number;
  value: string;
}

//TODO - re-write tags, add or remove them from array when checked

const tagOptions: TagOption[] = [
  { id: 1, value: "improve sleep", checked: false },
  { id: 2, value: "sleep quality", checked: false },
  { id: 3, value: "sleep better", checked: false },
  { id: 4, value: "how to slee better", checked: false },
  { id: 5, value: "how to improv sleep", checked: false },
  { id: 6, value: "optimize sleep", checked: false },
  { id: 7, value: "get better slee", checked: false },
  { id: 8, value: "circadian clock", checked: false },
  { id: 9, value: "circadian rhythm", checked: false },
  { id: 10, value: "stay asleep", checked: false },
  { id: 11, value: "fall back alsee", checked: false },
  { id: 12, value: "lifespan", checked: false },
  { id: 13, value: "procrastination", checked: false },
  { id: 14, value: "andrew huberman", checked: false },
];

let nextId = 0; // initialize a number to increment for the purpose of creating id's

function filterVideos(items, query) {
  query = query.toLowerCase();
  return items.filter((item) =>
    item.name.split(" ").some((word) => word.toLowerCase().startsWith(query))
  );
}



export default function Filter() {
  const [tags, setTags] = useState<Tag[]>([]);
  // const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  // This function is our even handler that will be sent down the child functions
  function handleUpdateTags(id: number, value: string, checked: boolean) {
    
    // If the input is unchecked, remove the tag
    if (checked === false) {
      setTags(tags.filter((a) => a.id !== tag.id));
    } else {
      // otherwise, update state
      // if the tags array doesn't contain an element with id equal to that passed into handleUpdateTags
      if (tags.some((tag) => tag.id !== id)) {
        //  1. replace the state with a new array, that contains all of the old items
        //  2. and a new item: object with properties id and value,
        //  3. where id is nextId++ and value is the value passed into handleUpdateTags
        //  see: https://react.dev/learn/updating-arrays-in-state#adding-to-an-array
        setTags([...tags, { id: nextId++, value: value }]);
      }
    }

    // updateFilteredVideos();
  }

  // need function to filter videos
  const filteredVideos = filterVideos();

  // function updateFilteredVideos() {
  //   // const checkedTags = tags
  //   //   .filter((tag) => tag.checked)
  //   //   .map((tag) => tag.value);
  //   // console.log(checkedTags);
  //   // if(video.items[0].snippet.tags.filter(tag) =>tags.some(tag=>tag.value === ))
  //   // do this all in one line!
  //   // if (video.items[0].snippet.tags.filter((tag) => tags.some(tag))) {
  //   //   if (filteredVideos.some((el) => el.items[0].id !== video.items[0].id))
  //   //     setFilteredVideos([...filteredVideos, video]);
  //   // }
  // }

  //   const matchedTags = video.items[0].snippet.tags.filter((tag) =>
  //     checkedTags.includes(tag)
  //   );

  //   console.log(matchedTags, matchedTags.length);
  //   if (matchedTags.length > 0) {
  //     // replace filteredVideos with a new array that contains all of the old items plus a new one at the end
  //     if (filteredVideos.some((el) => el.items[0].id !== video.items[0].id))
  //       setFilteredVideos([...filteredVideos, video]);
  //   }
  // });
  // );
  // return;

  return (
    <>
      {videos.map((v: Video) => (
        <div key={v.items[0].id}>
          <p>{v.items[0].snippet.tags}</p>
          <p>{v.items[0].id}</p>
        </div>
      ))}
      <hr />
      <TagFilter
        tags={tagOptions}
        onChange={handleUpdateTags}
      />
      <hr />
      <VideoList videos={filteredVideos} />
    </>
  );
}

// TagFilter component that accepts props from Parent component:
//   1. state value 'tags'
//   2. event handler

function TagFilter({ tags, onChange }) {
  return (
    <div>
      <h1>filter</h1>
      <ul>
        {tags.map((tag: TagOption) => (
          <div key={tag.id}>
            <input
              type="checkbox"
              name={tag.value}
              //   checked={tag.checked}
              id={tag.id.toString()}
              // pass the onChange prop as the onChange fucntion
              onChange={onChange(tag.id, tag.value, tag.checked)}
            />
            <label htmlFor={tag.id.toString()}>{tag.value}</label>
          </div>
        ))}
      </ul>
    </div>
  );
}

// VideoList component that accepts videos, a filtered array
function VideoList({ videos }) {
  return (
    <div>
      <h1>videos</h1>
      {videos.map((video: Video) => (
        <p>{video.items[0].id}</p>
      ))}
    </div>
  );
}
