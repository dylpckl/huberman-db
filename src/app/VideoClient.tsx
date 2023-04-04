"use client";
import useSWR from "swr";
import Image from "next/image";
import Tags from "./Tags";

const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// 
// link = https://www.youtube.com/watch?v= & videoId

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
    <div className="rounded bg-pink-600">
      <span>{data.items[0].id}</span>
      {data.items.map((i) => (
        <div key={i.id} className="grid-span-1">
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
