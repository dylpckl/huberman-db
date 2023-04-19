import Filter from "./Filter";
import Video from "./Video.old";
import { supabase } from "@/app/lib/supabaseClient";

const CHANNEL_ID = "UC2D2CMWXMOVWx7giW1n3LIg";
const UPLOADS_PLAYLIST_ID = "UU2D2CMWXMOVWx7giW1n3LIg";
const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// 1. Get all videos and add them to db if they don't exist
//    - getPlaylistItems returns a list of videoId's
//    - getVideoDetails gets the details of each videoId

interface PlaylistItems {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    contentDetails: {
      videoId: string;
      videoPublishedAt: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

// recursively execute until all videos are retrieved
async function getPlaylistItems(
  playlistId: string,
  pageToken?: string
): Promise<PlaylistItems> {
  const requestUrl = pageToken
    ? `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50` +
      `&pageToken=${pageToken}`
    : `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;

  const response = await fetch(requestUrl, { cache: "no-store" });
  const playlistItems: PlaylistItems = await response.json();

  if (response.ok) {
    if (playlistItems.nextPageToken) {
      // console.log(playlistItems.nextPageToken);
      const nextPageData = await getPlaylistItems(
        playlistId,
        playlistItems.nextPageToken
      );
      return {
        ...playlistItems,
        items: [...playlistItems.items, ...nextPageData!.items],
      };
    }

    return playlistItems;
  }
}

async function fetchData() {
  const res = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    // next: { revalidate: 10 },
  });
  const data = await res.json();
  // console.log(data);
  return data;
}

async function getVideoDetails(obj: PlaylistItems) {
  // console.log(obj.items.some(item=>item.contentDetails.videoId==='6ZrlsVx85ek'))
  const videos: Video[] = [];
  const videosFromDb = await fetchData();

  async function seedDatabase() {
    // console.log(videosFromDb);
    for (const item of obj.items) {
      // if video exists in db, fetch the record and push into array
      // if not, add the record and push into array
      if (videosFromDb.data) {
        if (
          videosFromDb.data.some(
            (v) => v.videoid === item.contentDetails.videoId
          )
        ) {
          const { data: video, error } = await supabase
            .from("videos")
            .select("*")
            .eq("videoid", item.contentDetails.videoId);
          // console.log("video found in db:", video[0]);
          if (!error) videos.push(video[0]);
          // console.log(videos);
        } else {
          // console.log(
          //   "videoId ",
          //   item.contentDetails.videoId,
          //   " not found in db, fetching from API"
          // );
          const response = await fetch(
            `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.videoId}&key=${apiKey}`
          );
          const apiData = await response.json();
          // console.log(apiData);

          if (
            !videosFromDb.data.some(
              (v: Video) => v.videoid === apiData.items[0].id
            )
          ) {
            // create a new record in the 'videos' table
            const { data: createdVideo, error } = await supabase
              .from("videos")
              .insert({
                videoid: apiData.items[0].id,
                title: apiData.items[0].snippet.title,
                description: apiData.items[0].snippet.description,
                published_at: apiData.items[0].snippet.publishedAt,
                thumbnail_url: apiData.items[0].snippet.thumbnails.maxres.url,
                thumbnail_height:
                  apiData.items[0].snippet.thumbnails.maxres.height,
                thumbnail_width:
                  apiData.items[0].snippet.thumbnails.maxres.width,
                tags: apiData.items[0].snippet.tags,
              })
              .select();
            if (!error) videos.push(createdVideo);
          }
        }
      }
      // console.log(videos);
    }
    return videos;
  }

  return await seedDatabase();
}

export default async function Home() {
  const playlistItems = await getPlaylistItems(UPLOADS_PLAYLIST_ID);
  // console.log(playlistItems.items.length);
  const videos = await getVideoDetails(playlistItems);

  return (
    <main className="min-h-screen flex flex-col gap-4 bg-gradient-to-t from-yellow-200 from-5% via-sky-500 via-70% to-indigo-900">
      <div className="container mx-auto sm:px-6 lg:px-8 mt-8">
        <Filter videos={videos} />
      </div>
    </main>
  );
}
