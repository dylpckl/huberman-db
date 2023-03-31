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

  // console.log(videos);
  const filteredVideos = filterVideos(videos, tags);
  // const filteredTags = filterTags(query, tags);
  // console.log(filteredTags);

  // MANAGING TAGS ------------------------------------------------------

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
    // console.log(query, typeof query, query === "");

    // If query is an empty string, reset tag.visible to false for all tags
    // if (query === "") {
    //   setTags(
    //     tags.map((tag) => {
    //       return { ...tag, visible: false };
    //     })
    //   );
    // } else {
    // const tagsToUpdate = tags.filter(
    //   (tag) =>
    //     tag.value
    //       .split(" ") // divides tag.value into an ordered list of substrings; e.g. "one two three" -> ["one","two","three"]
    //       // .some((word) => word.toLowerCase().startsWith(query))
    //       .some((word) => word.toLowerCase().includes(query))
    //   // check the array of substrings for a "word" that contains the query
    // );

    // console.log("tagsToUpdate", tagsToUpdate);

    // return tagsToUpdate.map((tagToUpdate) => {
    //   if (tags.some((tag) => tag.value === tagToUpdate.value)) {
    //     // console.log(
    //     //   tags,
    //     //   value,
    //     //   tags.some((e) => e.value === value)
    //     // );
    //     setTags(
    //       tags.map((tag) => {
    //         // console.log("updating" + tag);
    //         if (tag.value === tagToUpdate.value) {
    //           // Create a *new* object with changes
    //           return { ...tag, visible: true };
    //         }
    //         // No changes
    //         return tag;
    //       })
    //     );
    //   }
    // });

    // V2
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

    // console.log(tagsToUpdate);
    // console.log(tags.filter((tag) => tag.visible === true));

    // const x = tagsToUpdate.map((tagToUpdate) => {
    //   tags.some((t) => {
    //     if (t.value === tagToUpdate.value) {
    //       setTags(
    //         tags.map((tag) => {
    //           return { ...tag, visible: true };
    //         })
    //       );
    //     } else {
    //       // No changes
    //       return tag;
    //     }
    //   });
    // });

    //   setTags(tags.map(tag=>{
    //     tagsToUpdate.map(t=>{
    //       if(t.value === tag.value){

    //       }
    //     })
    //   }))
    // }

    // the function returns an array via tags.filter
    // the callback passed into .filter takes argument 'tag'
    // tag.value.split divides the query string into an ordered list of substrings and places them into an array
    // which allows us to call .some on the substring array
    // passing a callback function which returns 'words' that are converted to lowercase
    // and then we check if the word starts with the query value
    // re

    //   tags.filter((tag) =>
    //   tag.value
    //     .split(" ")
    //     .some((word) => word.toLowerCase().startsWith(query))
    // )

    // // aproach one - build a list of tags that match query, then match to the value of any in tags and set visible to true

    // update all tags in tagsToUpdate!!

    // check two arrays compare two arrays (some + )

    // setTags(tags.map((tag) => {}));

    // return tags.map(tag=>{
    //   if(tag.value)
    // })

    // const updateTags = tagsToUpdate.map(tagToUpdate=>
    //   if (tags.some((tag) => tag.value !== value)) {
    //     // console.log(
    //     //   tags,
    //     //   value,
    //     //   tags.some((e) => e.value === value)
    //     // );
    //     setTags(
    //       tags.map((tag) => {
    //         if (tag.value === value) {
    //           // Create a *new* object with changes
    //           return { ...tag, active: true };
    //         }
    //         // No changes
    //         return tag;
    //       })
    //     );
    //   }
    // )

    // return updateTags

    // approach two - ??

    // V2 -------------------------
    // the point of this function is to update state
    // actually, i want to set visible:true
    // we want to update a state array and the objects inside of it
    // see: https://react.dev/learn/updating-arrays-in-state
    // see: https://react.dev/learn/updating-objects-in-state

    //   const updatedTags = tagsToUpdate.map(tag =>
    //     setTags(
    //       tags.map((tag)=>
    //       return)
    //     )
    //     tag.active===true

    //   return updatedTags
    // }

    // event handler sent down to the searchbar to update state value `query`
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
      <h1>filter</h1>

      {/* search bar - onchange, set query in state, use query to return tags, render inputs so tags can be checked off */}
      <input
        type="text"
        placeholder="search a tag"
        value={query}
        onChange={searchOnChange}
      />

      <ul>
        {/* <TagsList
          tags={tags}
          onChange={onChange}
        /> */}

        {tags &&
          tags
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

        {/* {tags &&
          tags.map((tag: Tag) => (
            // console.log(tag.value, tag.visible);

            <div key={tag.value}>
              <div
                className={`flex ${
                  tag.visible === true ? "visible" : "invisible"
                }`}
              >
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
            </div>
          ))} */}

        {/* {tags &&
          tags.map((tag: Tag) => (
            <div
              key={tag.value}
              className="flex"
            >
              <input
                type="checkbox"
                // name={`${tag.value},${tag.id}`}
                id={tag.value}
                // pass the event handler prop into the onChange method on the input
                // the syntax to pass an inline function is: onClick={() => alert('...')}
                onChange={(e) => onChange(tag.value, e.target.checked)}
              />
              <label htmlFor={tag.value}>{tag.active}</label>
              <hr />
              <p>{tag.visible.toString()}</p>
            </div>
          ))} */}
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
