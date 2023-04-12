"use client"; // This is a client component because we can't pass props from a Client to a Server component
import useSWR from "swr";
import Image from "next/image";
import Tags from "./Tags";
import { supabase } from "@/app/lib/supabaseClient";

// const url = "https://youtube.googleapis.com/youtube/v3/";
// const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// async function test(videoId: string) {
//   const { data, error } = await supabase
//     .from("videos")
//     .select("")
//     .eq("videoid", videoId);
//   console.log(data);
// }

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

export default function VideoClient({ video }: Video) {
  // const videoData: Video = await getVideoDetails(videoId);
  // const swrKey = `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`;
  // const { data, error } = useSWR(swrKey, fetcher);
  // const data = await test(videoId);
  // console.log(video);

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  const publishedAt = new Date(video.published_at);

  return (
    <div className="">
      {/* <span>{video.videoid}</span> */}

      <div
        key={video.videoid}
        className="group relative grid-span-1 flex flex-col gap-2 rounded-md bg-pink-300 p-2"
      >
        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={video.thumbnail_url}
            alt={video.title}
            width={video.thumbnail_width}
            height={video.thumbnail_height}
            className="object-cover object-center"
          />
        </div>

        {/* Meta */}
        <p className="text-sm">
          {publishedAt.toLocaleDateString("en-us", {
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Title & Description */}
        <div className="flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
          <h3>
            <a href={`https://www.youtube.com/watch?v=${video.videoid}`}>
              <span
                aria-hidden="true"
                className=""
              />
              {video.title}
            </a>
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {video.description}
        </p>
      </div>
    </div>
  );
}
