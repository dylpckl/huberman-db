import Image from "next/image";
import { Inter } from "next/font/google";

const CHANNEL_ID = "UC2D2CMWXMOVWx7giW1n3LIg";
const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function getUploadsPlayistId() {
  const res = await fetch(
    `${url}channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
  );
  return res.json();
}

async function getPlaylistItems() {
  const res = await fetch(
    `${url}playlistItems?part=contentDetails&playlistId=UU2D2CMWXMOVWx7giW1n3LIg&key={{api_key}}`
  );
}

async function getVideoDetails() {}

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  // Initiate both requests in parallel
  // const artistData = getArtist(username);
  // const albumsData = getArtistAlbums(username);
  const uploadsPlaylistId = await getUploadsPlayistId();
  // const { uploadsPlaylistId2 } = uploadsPlaylistId.items.id;
  // const { id } = uploadsPlaylistId.items[0].id;
  console.log(uploadsPlaylistId.items[0].id);
  // Wait for the promises to resolve
  // const [artist, albums] = await Promise.all([artistData, albumsData]);

  return (
    <main>
      <div className="text-red-300">hi</div>
    </main>
  );
}
