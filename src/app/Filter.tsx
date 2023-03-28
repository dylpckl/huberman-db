"use client";
import { useState } from "react";

const videos = {
  kind: "youtube#playlistItemListResponse",
  etag: "FDZxfYqnnOjWQGmg3Uww_nrUZpI",
  nextPageToken: "EAAaBlBUOkNBbw",
  items: [
    {
      kind: "youtube#playlistItem",
      etag: "Oo2j1-6XrRYWTAK6y5TcGY6RT6o",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLkstVFcyQ2hwejRr",
      contentDetails: {
        videoId: "K-TW2Chpz4k",
        videoPublishedAt: "2023-03-27T12:00:13Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "JLWa7vkL2rLyCk3dOGGsBNB7hAw",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLmNwOUdYbDlRa19z",
      contentDetails: {
        videoId: "cp9GXl9Qk_s",
        videoPublishedAt: "2023-03-24T12:00:22Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "_bW0iEoIyh_hVRje8be5TERdSNc",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLnVmc0lBNU5BUklv",
      contentDetails: {
        videoId: "ufsIA5NARIo",
        videoPublishedAt: "2023-03-20T12:00:47Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "Z86Dhz3Jb3GY5jygDz8Z7CpBjSA",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLjdSMy0zSFI2LXU0",
      contentDetails: {
        videoId: "7R3-3HR6-u4",
        videoPublishedAt: "2023-03-13T12:00:07Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "GitG0rtppBIQM1A1RZ1-0IGcQRI",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLmF0MzdZOHJLRGxB",
      contentDetails: {
        videoId: "at37Y8rKDlA",
        videoPublishedAt: "2023-03-06T13:00:02Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "XLfn9z0KU8CxFQEnbtb28L8s2Uo",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLkNEVWV0UU1LTTZn",
      contentDetails: {
        videoId: "CDUetQMKM6g",
        videoPublishedAt: "2023-02-27T13:00:10Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "wE0fI2VIstjKbxf9nYLMSNglwSg",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLlM4blBKVTl4a053",
      contentDetails: {
        videoId: "S8nPJU9xkNw",
        videoPublishedAt: "2023-02-24T13:00:16Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "SNRWQMHJuI7z3QTzAJX0mpSYiMQ",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLnEzN0FSWW5SREdj",
      contentDetails: {
        videoId: "q37ARYnRDGc",
        videoPublishedAt: "2023-02-22T13:00:37Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "_cE5CNjsvfuA34nvLI19kWAYZkY",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLng0bV9QZEZidS1z",
      contentDetails: {
        videoId: "x4m_PdFbu-s",
        videoPublishedAt: "2023-02-20T13:00:46Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "FthcMoiZ6lF3-mfsWD-LDxBI330",
      id: "VVUyRDJDTVdYTU9WV3g3Z2lXMW4zTElnLmp1RDk5X3NQV0dV",
      contentDetails: {
        videoId: "juD99_sPWGU",
        videoPublishedAt: "2023-02-15T13:00:36Z",
      },
    },
  ],
  pageInfo: {
    totalResults: 135,
    resultsPerPage: 10,
  },
};

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
];

// function filterVideos(videos){
//     return videos.filter(video=>
//         video.

//         )
// }

export default function Filter() {
  const [tags, setTags] = useState(tagOptions);

  // update array of tags with setTags
  function handleTagOptionChange(id: number, checked: boolean) {
    // initialize a new variable updateTags, which maps over the tags array and checks the id of each tag in the array to the argument provided to the funtion. if the id matches, then spread the tag object and set the checked property to the argument provided (true or false)
    const updatedTags = tags.map((tag: TagOption) =>
      tag.id === id ? { ...tag, checked } : tag
    );
    setTags(updatedTags);
  }

  //   function handleTagOptionChange(
  //     id: number,
  //     checked: boolean,
  //     tags: TagOption[],
  //     setTags: React.Dispatch<React.SetStateAction<TagOption[]>>
  //   ) {
  //     const updatedTags = tags.map((tag: TagOption) =>
  //       tag.id === id ? { ...tag, checked } : tag
  //     );
  //     setTags(updatedTags);
  //   }

  return (
    <>
      <FilterBar
        tags={tagOptions}
        onChange={handleTagOptionChange}
      />
      <hr />
      {/* <VideoList videos={results} /> */}
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
      {videos.map((video) => (
        <p>{video.title}</p>
      ))}
    </div>
  );
}
