"use client";
import { Fragment, useState, useEffect } from "react";
import VideoClient from "./VideoClient";

// TODO - re-write TagFilter component to render the checkboxes properly as per state

interface Tag {
  value: string;
  active: boolean;
  visible: boolean;
}

// A list of generic tags that I should never include
const excludeTags = [
  "andrew huberman",
  "andrew d. huberman",
  "dr. andrew huberman",
  "dr andrew huberman",
  "huberman lab",
  "huberman podcast",
  "science podcast",
  "science",
  "huberman",
  "andrew huberman podcast",
  "huberman lab podcast",
  "the huberman lab podcast",
];

// HELPER FUNTIONS ---------------------------------------------------------

// This function filters the array of videos, only returning those with currently active tags
function filterVideos(videos: Video[], tags: Tag[]): Video[] {
  // console.log(videos, tags);
  // 1. use filter() method on the videos array to return a new array videos
  // 2. use some() on video.items[0].snippet.tags to see if at least one element in the array
  //      passes the test in the provided function
  // 3. the provided function being:
  //      use some() on the tags state array to find tags where
  //      tag.value === t from video.items[0].snippet.tags
  //      and where tag.active === true (checked)
  // console.log(tags);
  const result = videos.videos.filter((video: Video) =>
    video.items[0].snippet.tags.some((t) =>
      tags.some((tag) => tag.value === t && tag.active === true)
    )
  );

  // console.log(
  //   result.map((r) => r.items[0].snippet.tags),
  //   tags
  // );
  return result;
}

// ----------------------------------------------------------------------------------------
// FILTER.TSX COMPONENT -------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

export default function Filter(videos: Video[]) {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>(() => {
    // const initialState = getInitialTags(videos);
    // return initialState;

    // does this work?
    return getInitialTags(videos);
  });

  const filteredVideos = filterVideos(videos, tags);

  // This function creates the initial list of tags that exist on the videos array passed into
  function getInitialTags(videos) {
    const tagsArr: Tag[] = [];
    const tagsToAdd = videos.videos.map((video: Video) => {
      video.items[0].snippet.tags.map((tag) => {
        if (!excludeTags.some((t) => t === tag.toLowerCase())) {
          if (!tagsArr.some((t) => t.value === tag)) {
            tagsArr.push({ value: tag, active: false, visible: false });
          }
        }
      });
    });
    // console.log(tagsArr);
    return tagsArr;
  }

  // EVENT HANDLERS ------------------------------------------------------
  // these are sent down to child components as props

  // this function updates the tags state array the active property
  // see https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays
  function handleUpdateTagsActive(value: string, active: boolean) {
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
      // if the tags array doesn't contain an element with value equal to that passed into handleUpdateTags
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
      }
    }
  }

  // this event handler updates the tags state array - the visible property
  function handleUpdateTagVisible(query: string) {
    query = query.toLowerCase();

    // call setTags, map through all tags and compare value to query, set visible true

    setTags(
      tags.map((tag) => {
        if (tag.value.includes(query)) {
          // Create a *new* object with changes
          return { ...tag, visible: true };
        }
        // No changes
        return { ...tag, visible: false };
      })
    );
  }

  // This event handler function serves two purposes:
  function handleChange(e) {
    // 1. update state value 'query'
    setQuery(e.target.value);
    // 2. update state tags values (tag.visible === true)
    handleUpdateTagVisible(query);
  }

  return (
    <>
      <TagFilter
        tags={tags}
        onChange={handleUpdateTagsActive}
        searchOnChange={handleChange}
      />
      <hr />
      <VideoList videos={filteredVideos} />
    </>
  );
}

// COMPONENTS ----------------------------------------------------------

// TagFilter component that accepts props from Parent component:
//   1. state value 'tags'
//   2. event handler
//  always renders tags state array, only those with active:true
function TagFilter({ query, tags, onChange, searchOnChange }) {
  // if (filteredTags === undefined) return <h1>tags loading</h1>;

  return (
    <div>
      {/* 
      search bar always visible?
      inside a div, render:
      1. search input
      2. filteredTags (fix height of scrollbar)
      
         function classNames(...classes) {
          return classes.filter(Boolean).join(' ')
        }

      */}

      {/* search bar - onchange, set query in state, use query to return tags, render inputs so tags can be checked off */}
      <input
        type="text"
        placeholder="search a tag"
        value={query}
        onChange={searchOnChange}
      />

      {/* <TagsList
          tags={tags}
          onChange={onChange}
        /> */}

      {tags.length > 0 && (
        <div className="mt-1 max-h-60 w-full overflow-auto">
          {tags
            .filter((tag: Tag) => tag.visible === true)
            .map((filteredTag: Tag) => {
              return (
                // console.log(tag.value, tag.visible);

                <div key={filteredTag.value}>
                  <div>
                    <input
                      type="checkbox"
                      // name={`${tag.value},${tag.id}`}
                      id={filteredTag.value}
                      // pass the event handler prop into the onChange method on the input
                      // the syntax to pass an inline function is: onClick={() => alert('...')}
                      onChange={(e) =>
                        onChange(filteredTag.value, e.target.checked)
                      }
                    />
                    <label htmlFor={filteredTag.value}>
                      {filteredTag.value}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* display active filters */}
      <div>
        <h1>Filters</h1>
        {tags.length > 0 && (
          <div>
            {tags
              .filter((tag: Tag) => tag.active === true)
              .map((activeFilter: Tag) => (
                <span
                  key={activeFilter.value}
                  className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                >
                  <span>{activeFilter.value}</span>
                  <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    onClick={() => onChange(activeFilter.value, false)}
                  >
                    <span className="sr-only">
                      Remove filter for {activeFilter.value}
                    </span>
                    <svg
                      className="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

// VideoList component that accepts the result of filterVideos()
function VideoList({ videos }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* {videos && videos.map((video: Video) => <p>{video.items[0].id}</p>)} */}
      {videos &&
        videos.map((video: Video) => (
          <VideoClient videoId={video.items[0].id} />
        ))}
    </div>
  );
}

// function TagsList({ tags, onChange }) {
//   return (
//     <>
//       {tags &&
//         tags.map((tag: Tag) => (
//           // console.log(tag.value, tag.visible);

//           <div key={tag.value}>
//             <p>{tag.visible.toString()}</p>
//             <p>{tag.value}</p>
//           </div>

//           // <div key={tag.value}>
//           //   <div
//           //     className={`flex ${
//           //       tag.visible === true ? "visible" : "none"
//           //     }`}
//           //   >
//           //     <input
//           //       type="checkbox"
//           //       // name={`${tag.value},${tag.id}`}
//           //       id={tag.value}
//           //       // pass the event handler prop into the onChange method on the input
//           //       // the syntax to pass an inline function is: onClick={() => alert('...')}
//           //       onChange={(e) => onChange(tag.value, e.target.checked)}
//           //     />
//           //     <label htmlFor={tag.value}>{tag.value}</label>
//           //   </div>
//           // </div>
//         ))}
//     </>
//   );
// }
