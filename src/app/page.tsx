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
    `${url}playlistItems?part=contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`
  );

  return res.json();
}

export default async function Home() {
  // Initiate both requests in parallel
  // const artistData = getArtist(username);
  // const albumsData = getArtistAlbums(username);

  const uploadsPlaylistObj = await getUploadsPlayistId();
  const uploadsPlaylistId =
    uploadsPlaylistObj.items[0].contentDetails.relatedPlaylists.uploads;
  const playlistItems = await getPlaylistItems(uploadsPlaylistId);

  // console.log(uploadsPlaylistObj, uploadsPlaylistId);
  // console.log(playlistItems);

  // Wait for the promises to resolve
  // const [artist, albums] = await Promise.all([artistData, albumsData]);

  return (
    <main>
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
