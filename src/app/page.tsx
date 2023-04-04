import Filter from "./Filter";
import Video from "./Video";

const CHANNEL_ID = "UC2D2CMWXMOVWx7giW1n3LIg";
const UPLOADS_PLAYLIST_ID = "UU2D2CMWXMOVWx7giW1n3LIg";
const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// async function getUploadsPlayistId() {
//   const res = await fetch(
//     `${url}channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
//   );
//   return res.json();
// }

// recursively execute until all videos are retrieved
async function getPlaylistItems(playlistId: string, pageToken?: string) {
  const request =
    `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50` +
    `&pageToken=${pageToken}`;

  const res = await fetch(
    `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`
  );

  return res.json();
}

async function getPlaylistItems2(playlistId: string, pageToken?: string) {
  const requestUrl = pageToken
    ? `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50` +
      `&pageToken=${pageToken}`
    : `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
  // console.log(requestUrl);
  const response = await fetch(requestUrl);
  const data = await response.json();
  // // console.log(data);
  if (response.ok) {
    if (data.nextPageToken) {
      const nextPageData = await getPlaylistItems2(
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
  // throw new Error(`Failed to fetch data from ${url}`);
}

// async function getVideoDetails(videoId: string) {
//   const res = await fetch(
//     `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
//   );
//   return res.json();
// }

async function fetchItems(obj) {
  // console.log("obj", obj);
  const videos: Video[] = [];
  for (const item of obj.items) {
    const response = await fetch(
      `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.videoId}&key=${apiKey}`
    );
    const data = await response.json();
    // console.log(data)
    videos.push(data);
  }
  // const res = await Promise.all(
  //   obj.items.map(async (item) => {
  //     const res = await fetch(
  //       `${url}videos?part=contentDetails,snippet,statistics&id=${item.contentDetails.id}&key=${apiKey}`
  //     );
  //     const data = await res.json();
  //     videos.push(data);
  //   })
  // );
  return videos;
}

export default async function Home() {
  // const uploadsPlaylistObj = await getUploadsPlayistId();
  // const uploadsPlaylistId =
  //   uploadsPlaylistObj.items[0].contentDetails.relatedPlaylists.uploads;
  // console.log(uploadsPlaylistId);
  // const playlistItems = await getPlaylistItems(UPLOADS_PLAYLIST_ID);
  const playlistItems = await getPlaylistItems2(UPLOADS_PLAYLIST_ID);
  // console.log(playlistItems);

  const videos = await fetchItems(playlistItems);
  // console.log(videos.length);

  return (
    <main className="min-h-full h-screen flex flex-col gap-4 bg-gradient-to-t from-indigo-900 via-sky-500 via-30% to-yellow-100">
      <Filter videos={videos} />
      <div className="text-zinc-200 grid grid-cols-4 gap-4">
        {/* {playlistItems.items.map((item) => (
          <>
            @ts-expect-error Async Server Component
            <Video videoId={item.contentDetails.videoId} />
          </>
        ))} */}
      </div>
    </main>
  );
}
