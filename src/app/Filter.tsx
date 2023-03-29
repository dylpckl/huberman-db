"use client";
import { useState } from "react";
import { videos } from "../app/lib/videos";
import Video from "./Video";

interface Tag {
  value: string;
  active: boolean;
}

// TODO - reword tags object, don't need id

const testTags: Tag[] = [
  { value: "improve sleep", active: false },
  { value: "sleep quality", active: false },
  { value: "sleep better", active: false },
  { value: "how to slee better", active: false },
  { value: "how to improv sleep", active: false },
  { value: "optimize sleep", active: false },
  { value: "get better slee", active: false },
  { value: "circadian clock", active: false },
  { value: "circadian rhythm", active: false },
  { value: "stay asleep", active: false },
  { value: "fall back alsee", active: false },
  { value: "lifespan", active: false },
  { value: "procrastination", active: false },
  { value: "andrew huberman", active: false },
];
// const testTags: Tag[] = [
//   { id: 1, value: "improve sleep", checked: false },
//   { id: 2, value: "sleep quality", checked: false },
//   { id: 3, value: "sleep better", checked: false },
//   { id: 4, value: "how to slee better", checked: false },
//   { id: 5, value: "how to improv sleep", checked: false },
//   { id: 6, value: "optimize sleep", checked: false },
//   { id: 7, value: "get better slee", checked: false },
//   { id: 8, value: "circadian clock", checked: false },
//   { id: 9, value: "circadian rhythm", checked: false },
//   { id: 10, value: "stay asleep", checked: false },
//   { id: 11, value: "fall back alsee", checked: false },
//   { id: 12, value: "lifespan", checked: false },
//   { id: 13, value: "procrastination", checked: false },
//   { id: 14, value: "andrew huberman", checked: false },
// ];

let nextId = 0; // initialize a number to increment for the purpose of creating id's

function filterVideos(items, query) {
  query = query.toLowerCase();
  return items.filter((item) =>
    item.name.split(" ").some((word) => word.toLowerCase().startsWith(query))
  );
}

export default function Filter() {
  const [tags, setTags] = useState<Tag[]>(testTags);
  // const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  // This function is our even handler that will be sent down the child functions
  function handleUpdateTags(value: string, active: boolean) {
    // If the input is unchecked, update active to false
    if (active === false) {
      setTags(
        tags.map((tag) => {
          if (tag.value === value) {
            // Create a *new* object with changes
            return { ...tag, active: false };
          }
          // No changes
          return tag;
        })
      );
    } else {
      // otherwise, update state
      // if the tags array doesn't contain an element with id equal to that passed into handleUpdateTags
      if (tags.some((tag) => tag.value !== value)) {
        // console.log(
        //   tags,
        //   value,
        //   tags.some((e) => e.value === value)
        // );
        setTags(
          tags.map((tag) => {
            if (tag.value === value) {
              // Create a *new* object with changes
              return { ...tag, active: true };
            }
            // No changes
            return tag;
          })
        );

        // see https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays
      }
    }
  }

  return (
    <>
      {/* {videos.map((v: Video) => (
        <div key={v.items[0].id}>
          <p>{v.items[0].snippet.tags}</p>
          <p>{v.items[0].id}</p>
        </div>
      ))} */}
      <hr />
      <TagFilter
        tags={tags}
        onChange={handleUpdateTags}
      />
      <hr />
      {/* <VideoList videos={filteredVideos} /> */}
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
        {tags.map((tag: Tag) => (
          <div key={tag.value}>
            <input
              type="checkbox"
              // name={`${tag.value},${tag.id}`}
              id={tag.value}
              // pass the event handler called onChange into the onChange method on the input
              // the syntax to pass an inline function is: onClick={() => alert('...')}
              onChange={(e) => onChange(tag.value, e.target.checked)}
            />
            <label htmlFor={tag.value}>{tag.value}</label>
          </div>
        ))}
      </ul>
    </div>
  );
}

// VideoList component that accepts the result of filterVideos()
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
