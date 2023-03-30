"use client";
import { Fragment, useState, useEffect } from "react";
// import { videos } from "../app/lib/videos";
// import Video from "./Video";
import VideoClient from "./VideoClient";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";

interface Tag {
  value: string;
  active: boolean;
}

// const testTags: Tag[] = [
//   { value: "improve sleep", active: false },
//   { value: "sleep quality", active: false },
//   { value: "sleep better", active: false },
//   { value: "how to slee better", active: false },
//   { value: "how to improv sleep", active: false },
//   { value: "optimize sleep", active: false },
//   { value: "get better slee", active: false },
//   { value: "circadian clock", active: false },
//   { value: "circadian rhythm", active: false },
//   { value: "stay asleep", active: false },
//   { value: "fall back alsee", active: false },
//   { value: "lifespan", active: false },
//   { value: "procrastination", active: false },
//   { value: "andrew huberman", active: false },
// ];

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

let nextId = 0; // initialize a number to increment for the purpose of creating id's

// This function accepts a list of videos and returns only those that have tags that are
// active = true in state
function filterVideos(videos: Video[], tags: Tag[]): Video[] {
  // console.log(videos, tags);
  // 1. use filter() method on the videos array to return a new array videos
  // 2. use some() on video.items[0].snippet.tags to see if at least one element in the array
  //      passes the test in the provided function
  // 3. the provided function being:
  //      use some() on the tags state array to find tags where
  //      tag.value === t from video.items[0].snippet.tags
  //      and where tag.active === true (checked)
  console.log(tags);
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

export default function Filter(videos: Video[]) {
  const [tags, setTags] = useState<Tag[]>(() => {
    const initialState = getInitialTags(videos);
    return initialState;
  });

  function getInitialTags(videos) {
    const tagsArr: Tag[] = [];
    const tagsToAdd = videos.videos.map((video) => {
      video.items[0].snippet.tags.map((tag) => {
        if (!excludeTags.some((t) => t === tag.toLowerCase())) {
          if (!tagsArr.some((t) => t.value === tag)) {
            tagsArr.push({ value: tag, active: false });
          }
        }
      });
    });
    // console.log(tagsArr);
    return tagsArr;
  }

  // console.log(videos);
  const filteredVideos = filterVideos(videos, tags);

  // This function is our event handler that will be sent down the child functions
  // see https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays
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

  return (
    <>
      {/* <button onClick={setOpen(!open)}>click</button> */}
      <SearchBar />
      <TagFilter
        tags={tags}
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
        {tags.length > 0 &&
          tags.map((tag: Tag) => (
            <div key={tag.value}>
              <input
                type="checkbox"
                // name={`${tag.value},${tag.id}`}
                id={tag.value}
                // pass the event handler prop into the onChange method on the input
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
    <div className="grid grid-cols-4 gap-4">
      {/* {videos && videos.map((video: Video) => <p>{video.items[0].id}</p>)} */}
      {videos &&
        videos.map((video: Video) => (
          <VideoClient videoId={video.items[0].id} />
        ))}
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const people = [
    { id: 1, name: "Leslie Alexander", url: "#" },
    // More people...
  ];

  const filteredPeople =
    query === ""
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    // <h1>searchbar</h1>
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(person) => (window.location = person.url)}>
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />

                {filteredPeople.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredPeople.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        value={person}
                        className={({ active }) =>
                          classNames(
                            "cursor-default select-none rounded-md px-4 py-2",
                            active && "bg-indigo-600 text-white"
                          )
                        }
                      >
                        {person.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredPeople.length === 0 && (
                  <div className="px-4 py-14 text-center sm:px-14">
                    <UsersIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      No people found using that search term.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
