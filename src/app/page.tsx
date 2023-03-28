import Filter from "./Filter";
import Video from "./Video";

const CHANNEL_ID = "UC2D2CMWXMOVWx7giW1n3LIg";
const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function getUploadsPlayistId() {
  const res = await fetch(
    `${url}channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
  );

  return res.json();
}

async function getPlaylistItems(playlistId: string) {
  const res = await fetch(
    `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=5`
  );

  return res.json();
}

async function getVideoDetails(videoId: string) {
  const res = await fetch(
    `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
  );

  if (!res.ok) throw new Error("failed to fetch video data");

  return res.json();
}

export default async function Home() {
  const uploadsPlaylistObj = await getUploadsPlayistId();
  const uploadsPlaylistId =
    uploadsPlaylistObj.items[0].contentDetails.relatedPlaylists.uploads;
  console.log(uploadsPlaylistId);
  const playlistItems = await getPlaylistItems(uploadsPlaylistId);

  return (
    <main className="flex flex-col gap-4">
      <Filter />
      <div className="text-zinc-200 grid grid-cols-4 gap-4">
        {playlistItems.items.map((item) => (
          <>
            {/* @ts-expect-error Async Server Component */}
            <Video videoId={item.contentDetails.videoId} />
          </>
        ))}
      </div>
    </main>
  );
}
