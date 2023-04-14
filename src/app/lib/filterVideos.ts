export default function filterVideos(videos: Video[], tags: Tag[]): Video[] {
  //   console.log(videos, tags);
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
  return result;
}
