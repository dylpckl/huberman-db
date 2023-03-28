"use client";
import { useState } from "react";
import { videos } from "../app/lib/videos";
import Video from "./Video";

interface TagOption {
  id: number;
  value: string;
  checked: boolean;
}

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
];

// function filterVideos(videos){
//     return videos.filter(video=>
//         video.

//         )
// }

export default function Filter() {
  const [tags, setTags] = useState(tagOptions);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  // update array of tags with setTags
  function handleTagOptionChange(id: number, checked: boolean) {
    // initialize a new variable updateTags, which maps over the tags array and checks the id of each tag in the array to the argument provided to the funtion. if the id matches, then spread the tag object and set the checked property to the argument provided (true or false)
    const updatedTags = tags.map((tag: TagOption) =>
      tag.id === id ? { ...tag, checked } : tag
    );
    setTags(updatedTags);
    updateFilteredVideos();
  }

  function updateFilteredVideos() {
    const checkedTags = tags
      .filter((tag) => tag.checked)
      .map((tag) => tag.value);
    console.log(checkedTags);

    const updatedVideos = videos.map((video) => {
      const matchedTags = video.items[0].snippet.tags.filter((tag) =>
        checkedTags.includes(tag)
      );
      console.log(matchedTags);
      if (matchedTags.length > 0) {
        setFilteredVideos([...filteredVideos, { video }]);
      }
      //   console.log(matchedTags);
    });
    console.log(updatedVideos);
  }
  //   console.log(getFilteredVideos);

  return (
    <>
      <FilterBar
        tags={tagOptions}
        onChange={handleTagOptionChange}
      />
      <hr />
      <VideoList videos={filteredVideos} />
    </>
  );
}

function FilterBar({ tags, onChange }) {
  // render list of all tags with checkboxes
  // when box is checked, add tag to list of tags to include
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
              onChange={(e) => onChange(tag.id, e.target.checked)}
            />
            <label htmlFor={tag.id.toString()}>{tag.value}</label>
          </div>
        ))}
      </ul>

      {/* <input type="checkbox" />
      <label htmlFor="">label</label> */}
    </div>
  );
}

function VideoList({ videos }) {
  // render list of videos
  return (
    <div>
      <h1>videos</h1>
      {/* {videos.map((video: Video) => (
        <p>{video.items[0].snippet.title}</p>
      ))} */}
    </div>
  );
}
