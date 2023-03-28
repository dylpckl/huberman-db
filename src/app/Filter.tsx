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

const tagOptions = [
  { value: "improve sleep", checked: false },
  { value: "sleep quality", checked: false },
  { value: "sleep better", checked: false },
  { value: "how to slee better", checked: false },
  { value: "how to improv sleep", checked: false },
  { value: "optimize sleep", checked: false },
  { value: "get better slee", checked: false },
  { value: "circadian clock", checked: false },
  { value: "circadian rhythm", checked: false },
  { value: "stay asleep", checked: false },
  { value: "fall back alsee", checked: false },
];

// function filterVideos(videos){
//     return videos.filter(video=>
//         video.

//         )
// }

export default function Filter() {
  const [tags, setTags] = useState(tagOptions);

  // filter results
  // const results = filter

  // update array of tags with setTags
  function handleChange(e) {
    setFirst(e.target.value);
  }

  return (
    <>
      <FilterBar
        tags={tagOptions}
        onChange={handleChange}
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
        {tagOptions.map((tag,index) => (
          <div>
            <input
              type="checkbox"
              name=""
              id={`filter-${index}`}
            />
            <label htmlFor={`filter-${index}`}>{tag.value}</label>
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
