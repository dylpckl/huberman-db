import Filter from "./Filter";
import Video from "./Video";
import { supabase } from "@/lib/supabaseClient";

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
    ? `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50` +
      `&pageToken=${pageToken}`
    : `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
  // console.log(requestUrl);
  const response = await fetch(requestUrl);
  const data = await response.json();

  const { videosFromDb, error } = await supabase.from("videos").select("id");

  // returns an object with nested array 'items'
  // if item.contentDetails.videoId is not in the db, add a record with id
  // 1. map over items array
  // 2. use .some() to check videosFromDb array for records where id matches
  // 3. if there is no match, create a new record in the db
  const addToDb = data.items.map(async (item) => {
    if (!videosFromDb.some((v) => v.id === item.contentDetails.videoId)) {
      const { error } = await supabase
        .from("videos")
        .insert({ id: item.contentDetails.videoId });
    }
  });
  addToDb();

  if (response.ok) {
    if (data.nextPageToken) {
      const nextPageData = await getPlaylistItems(
        playlistId,
        data.nextPageToken
      );
      return {
        ...data,
        items: [...data.items, ...nextPageData.items],
      };
    }
    // console.log(data.items.length);
    return data;
  }
  // console.log(data.length);
  // return data;
}

async function getVideoDetails(obj) {
  const videos: Video[] = [];

  const { videosFromDb, error } = await supabase.from("videos").select();

  // console.log("obj", obj);

  for (const item of obj.items) {
    // if video details exist in db, pull from there
    if (videosFromDb.some((v) => v.id === item.contentDetails.videoId)) {
      // videos.push(stuff from supabase)
    } else {
      // otherwise, pull from api and add to db
      const response = await fetch(
        `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.videoId}&key=${apiKey}`
      );
      const data = await response.json();
      // console.log(data)
      videos.push(data);
    }

    // const response = await fetch(
    //   `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.videoId}&key=${apiKey}`
    // );
    // const data = await response.json();
    // // console.log(data)
    // videos.push(data);
  }

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
