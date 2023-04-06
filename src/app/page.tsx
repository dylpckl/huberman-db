import Filter from "./Filter";
import Video from "./Video";
import { supabase } from "@/app/lib/supabaseClient";

const CHANNEL_ID = "UC2D2CMWXMOVWx7giW1n3LIg";
const UPLOADS_PLAYLIST_ID = "UU2D2CMWXMOVWx7giW1n3LIg";
const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// 1. Get all videos and add them to db if they don't exist
//    - getPlaylistItems returns a list of videoId's
//    - getVideoDetails gets the details of each videoId

// recursively execute until all videos are retrieved
async function getPlaylistItems(playlistId: string, pageToken?: string) {
  const requestUrl = pageToken
    ? `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=5` +
      `&pageToken=${pageToken}`
    : `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=5`;
  // console.log(requestUrl);
  const response = await fetch(requestUrl);
  const playlistItems = await response.json(); // returns an object with nested array 'items'

  // const { data, error } = await supabase.from("videos").select("videoid");
  // console.log("supabase:", data);

  // if item.contentDetails.videoId is not in the db, add a record with id
  // 1. map over items array
  // 2. use .some() to check videosFromDb array for records where id matches
  // 3. if there is no match, create a new record in the db
  // const addToDb = () => {
  //   playlistItems.items.map(async (item) => {
  //     if (!data.some((v) => v.videoid === item.contentDetails.videoId)) {
  //       const { error } = await supabase
  //         .from("videos")
  //         .insert({ videoid: item.contentDetails.videoId });
  //     }
  //   });
  // };
  // addToDb();

  if (response.ok) {
    if (playlistItems.nextPageToken) {
      const nextPageData = await getPlaylistItems(
        playlistId,
        playlistItems.nextPageToken
      );
      return {
        ...playlistItems,
        items: [...playlistItems.items, ...nextPageData.items],
      };
    }
    // console.log(data.items.length);
    return playlistItems;
  }
}

async function getVideoDetails(obj) {
  // iterate through list of videoid's
  // if the videoid exists in supabase, read the row from supabase
  // otherwise, call youtube api and create the row

  const videos: Video[] = [];
  // const { data: videosInDb, error } = await supabase
  //   .from("videos")
  //   .select("videoid");
  // console.log(videosInDb);
  // console.log("obj", obj);

  const res = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 10 },
  });
  const data = await res.json();
  console.log(data);

  for (const item of obj.items) {
    // if video details exist in db, pull from there
    if (data.data.some((v) => v.videoid === item.contentDetails.videoId)) {
      // console.log(
      //   videosInDb.some((v) => v.videoid === item.contentDetails.videoId)
      // );
      // read row from supabase and push into videos[]
      const { data: videoInDb, error } = await supabase
        .from("videos")
        .select("*")
        .eq("videoid", item.contentDetails.videoId);
      videos.push(videoInDb[0]);
    } else {
      // console.log(
      //   videosInDb.some((v) => v.videoid === item.contentDetails.videoId)
      // );
      // otherwise, pull from api and add to db
      // const response = await fetch(
      //   `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.videoId}&key=${apiKey}`
      // );
      // const apiData = await response.json();
      // // console.log(apiData);
      // if (!videosInDb?.some((v) => v.videoid === apiData.items[0].id)) {
      //   // create a new record in the 'videos' table
      //   const { data: createdVideo, error } = await supabase
      //     .from("videos")
      //     .insert({
      //       videoid: apiData.items[0].id,
      //       title: apiData.items[0].snippet.title,
      //       // description: apiData.items[0].snippet.description,
      //       published_at: apiData.items[0].snippet.publishedAt,
      //       thumbnail_url: apiData.items[0].snippet.thumbnails.maxres.url,
      //       thumbnail_height: apiData.items[0].snippet.thumbnails.maxres.height,
      //       thumbnail_width: apiData.items[0].snippet.thumbnails.maxres.width,
      //       tags: apiData.items[0].snippet.tags,
      //     })
      //     .select();
      //   if (!error) videos.push(createdVideo);
      // }
    }
  }
  console.log(videos);
  return videos;
}

export default async function Home() {
  // const uploadsPlaylistObj = await getUploadsPlayistId();
  // const uploadsPlaylistId =
  //   uploadsPlaylistObj.items[0].contentDetails.relatedPlaylists.uploads;
  // console.log(uploadsPlaylistId);
  // const playlistItems = await getPlaylistItems(UPLOADS_PLAYLIST_ID);
  const playlistItems = await getPlaylistItems(UPLOADS_PLAYLIST_ID);
  // console.log(playlistItems);

  const videos = await getVideoDetails(playlistItems);
  // console.log(videos.length);

  return (
    <main className="min-h-full h-screen flex flex-col gap-4 bg-gradient-to-t from-yellow-100 from-5% via-sky-500 via-70% to-indigo-900">
      <div className="container mx-auto sm:px-6 lg:px-8 mt-8">
        <Filter videos={videos} />
      </div>
    </main>
  );
}
