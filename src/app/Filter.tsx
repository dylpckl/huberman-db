"use client";
import { Fragment, useState, useEffect, forwardRef, useRef } from "react";
import VideoGrid from "./VideoGrid";
import { filterTags } from "./lib/filterTags";
import { excludeTags } from "@/app/lib/excludedTags";
import { AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/app/lib/useOnClickOutside";

interface Tag {
  value: string;
  active: boolean;
  visible: boolean;
}

// HELPER FUNTIONS ---------------------------------------------------------

// This function filters the array of videos, only returning those with currently active tags
function filterVideos(videos: Video[], tags: Tag[]): Video[] {
  console.log(videos, tags);
  // 1. use filter() method on the videos array to return a new array videos
  // 2. use some() on video.items[0].snippet.tags to see if at least one element in the array
  //      passes the test in the provided function
  // 3. the provided function being:
  //      use some() on the tags state array to find tags where
  //      tag.value === t from video.items[0].snippet.tags
  //      and where tag.active === true (checked)
  // console.log(tags);
  const result = videos.videos.filter(
    (video: Video) =>
      // video.items[0].snippet.tags.some((t) =>
      video.tags &&
      video.tags.some((t) =>
        tags.some((tag) => tag.value === t && tag.active === true)
      )
  );

  // console.log(
  //   result.map((r) => r.items[0].snippet.tags),
  //   tags
  // );
  console.log(result);
  return result;
}

// ----------------------------------------------------------------------------------------
// FILTER.TSX COMPONENT -------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

export default function Filter(videos: Video[]) {
  console.log(videos);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>(() => {
    return getInitialTags(videos);
  });

  // This function creates the initial list of tags that exist on the videos array passed into
  function getInitialTags(videos: Video[]) {
    const tagsArr: Tag[] = [];
    const tagsToAdd = videos.videos.map((video: Video) => {
      video.tags &&
        video.tags.map((tag) => {
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

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const filteredVideos = filterVideos(videos, tags);

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
    setOpen(true);
  }

  function handleDisableTags() {
    setQuery("");
    setTags(
      tags.map((tag) => {
        return { ...tag, visible: false };
      })
    );
  }

  return (
    <AnimatePresence
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
    >
      <TagFilter
        query={query}
        tags={tags}
        open={open}
        onChange={handleUpdateTagsActive}
        searchOnChange={handleChange}
        ref={ref}
        disableTags={handleDisableTags}
      />
      <VideoGrid videos={filteredVideos} />
    </AnimatePresence>
  );
}

// COMPONENTS ----------------------------------------------------------

// TagFilter component that accepts props from Parent component:
//   1. state value 'tags'
//   2. event handler
//  always renders tags state array, only those with active:true
const TagFilter = forwardRef(
  ({ query, tags, onChange, searchOnChange, open, disableTags }, ref) => {
    return (
      <div>
        {/* Search Bar - onchange, set query in state, use query to return tags, render inputs so tags can be checked off */}
        <div className="">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <div>
              <input
                value={query}
                onChange={searchOnChange}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search for a topic..."
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={disableTags}
              >
                <div
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          {open && tags.length > 0 && (
            <div
              className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              ref={ref}
            >
              {tags
                .filter((tag: Tag) => tag.visible === true)
                .map((filteredTag: Tag) => {
                  return (
                    <div
                      key={filteredTag.value}
                      className="flex items-start"
                    >
                      <div className="flex h-6 items-center">
                        <input
                          id={filteredTag.value}
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          checked={filteredTag.active}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) =>
                            onChange(filteredTag.value, e.target.checked)
                          }
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label
                          htmlFor={filteredTag.value}
                          className="font-medium text-zinc-900"
                        >
                          {filteredTag.value}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Active Filters */}
        <div>
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
);
