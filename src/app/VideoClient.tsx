"use client";
import useSWR from "swr";
import Image from "next/image";
import Tags from "./Tags";

const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// const fetcher = async (videoId: string) => {
//   const res = fetch(
//     `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
//   );
//   const data = await res.json();
//   return data;
// };

// async function getVideoDetails(videoId: string) {
//   const res = await fetch(
//     `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
//   );

//   if (!res.ok) throw new Error("failed to fetch video data");

//   return res.json();
// }

export default function VideoClient({ videoId }: string) {
  // const videoData: Video = await getVideoDetails(videoId);
  const swrKey = `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`;
  const { data, error } = useSWR(swrKey, fetcher);
  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col rounded bg-pink-600 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      <h1>video</h1>
      <span>{data.items[0].id}</span>
      {data.items.map((i) => (
        <div key={i.id}>
          <p>{i.snippet.title}</p>
          <Image
            src={i.snippet.thumbnails.maxres.url}
            alt={i.snippet.title}
            width={i.snippet.thumbnails.maxres.width}
            height={i.snippet.thumbnails.maxres.height}
          />
          <Tags tags={i.snippet.tags} />
        </div>
      ))}
    </div>
  );
}
