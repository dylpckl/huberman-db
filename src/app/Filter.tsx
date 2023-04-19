"use client";

// External libraries
import { Fragment, useState, useEffect, forwardRef, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper functions
import { excludeTags } from "@/app/lib/excludedTags";
import useOnClickOutside from "@/app/lib/useOnClickOutside";
import useScrollToTop from "@/app/lib/useScrollToTop";
import getHighlightedText from "./lib/getHighlightedText";
import { filterTags } from "./lib/filterTags";
import filterVideos from "./lib/filterVideos";

// Components
import VideoGrid from "./VideoGrid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter(videos: Video[]) {
  const ref = useRef();
  // const scrollRef = useRef();
  // const [isScrollBtnVisible, scrollToTop] = useScrollToTop(scrollRef, 50);
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
    // setTags(
    //   tags.map((tag) => {
    //     return { ...tag, visible: false };
    //   })
    // );
  }
  function handleClearActiveTags() {
    setQuery("");
    setTags(
      tags.map((tag) => {
        return { ...tag, active: false };
      })
    );
  }
  function handleOpenSearchModal() {
    console.log("fire");
    setOpen(true);
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
        handleClearActiveTags={handleClearActiveTags}
        openSearchModal={handleOpenSearchModal}
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
interface TagFilterProps {
  query: string;
  tags: Tag[];
  onChange: Function;
  searchOnChange: Function;
  open: boolean;
  disableTags: Function;
  handleClearActiveTags: Function;
  openSearchModal: Function;
}

const TagFilter = forwardRef(
  (
    {
      query,
      tags,
      onChange,
      searchOnChange,
      open,
      disableTags,
      handleClearActiveTags,
      openSearchModal,
    }: TagFilterProps,
    ref
  ) => {
    const filteredTags =
      query === ""
        ? []
        : tags.filter((tag) => {
            return tag.value.toLowerCase().includes(query.toLowerCase());
          });

    return (
      <div
        className="relative mx-auto max-w-2xl"
        // ref={scrollRef}
      >
        {/* Search Bar */}
        <div className="relative mt-2 rounded-md shadow-sm ">
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
              onClick={openSearchModal}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search by video tag"
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {tags.length > 0 && tags.some((e) => e.active === true) && (
          <div className="bg-pink-300 mt-1 rounded-md flex items-center pl-2 gap-2">
            <button
              className=""
              onClick={handleClearActiveTags}
            >
              <svg
                className=" h-3 w-3"
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

            <div className="flex flex-wrap gap-1 my-2">
              {tags
                .filter((tag: Tag) => tag.active === true)
                .map((activeFilter: Tag) => (
                  <button
                    key={activeFilter.value}
                    type="button"
                    className="bg-teal-300 flex items-center w-fit h-6 ml-1 rounded-full px-2 py-1 text-sm"
                    onClick={() => onChange(activeFilter.value, false)}
                  >
                    <span className="sr-only">
                      Remove filter for {activeFilter.value}
                    </span>
                    {activeFilter.value}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Search Modal */}
        {open && (
          <div className="overflow-hidden">
            <ul
              className="absolute z-10 bg-blue-500 flex flex-col max-h-60 w-full overflow-x-hidden overflow-y-auto scroll-py-2 rounded-b-lg py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              ref={ref}
            >
              {filteredTags.length > 0 && (
                <>
                  {filteredTags.map((tag, index) => (
                    <li
                      onClick={(e) => onChange(tag.value, !tag.active)}
                      key={index}
                      className="relative flex items-start cursor-default select-none gap-2 py-2 px-4 w-full group hover:bg-black"
                    >
                      <span
                        className={classNames(
                          !tag.active
                            ? "invisible"
                            : "text-xs group-hover:text-white"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span className="flex truncate group-hover:text-white">
                        {getHighlightedText(tag.value, query)}
                      </span>
                      {/* <button
                      className="flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
                      // className={classNames(
                      //   tag.active ? "border-2 border-pink-300" : "border-0",
                      //   "flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
                      // )}
                      onClick={(e) => onChange(tag.value, !tag.active)}
                    >
                      {
                        <div className="flex">
                          {getHighlightedText(tag.value, query)}
                        </div>
                      }
                    </button> */}
                    </li>
                  ))}
                </>
              )}

              {query !== "" && filteredTags.length === 0 && (
                <div className="px-4 py-14 text-center sm:px-14">
                  <p className="mt-4 text-sm text-gray-900">
                    No people found using that search term.
                  </p>
                </div>
              )}
            </ul>
          </div>
        )}

        {/* {isScrollBtnVisible && (
          <button
            className="scrollToTopBtn"
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        )} */}
      </div>
    );
  }
);
