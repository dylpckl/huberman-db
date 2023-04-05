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
    <div className="">
      {/* <span>{data.items[0].id}</span> */}
      {data.items.map((i) => (
        <div
          key={i.id}
          className="group relative grid-span-1"
        >
          <a
            href={`https://www.youtube.com/watch?v=&${i.id}`}
            target="_blank"
            // rel="noreferrer noopener"
          >
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={i.snippet.thumbnails.maxres.url}
                alt={i.snippet.title}
                width={i.snippet.thumbnails.maxres.width}
                height={i.snippet.thumbnails.maxres.height}
                className="object-cover object-center"
              />
            </div>
            <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
              <h3>
                <a href="#">
                  <span
                    aria-hidden="true"
                    className=""
                  />
                  {i.snippet.title}
                </a>
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              {i.snippet.description}
            </p>
            {/* <Tags tags={i.snippet.tags} /> */}
          </a>
        </div>

        // <div key={i.id} className="grid-span-1">
        //   <p>{i.snippet.title}</p>
        //   <Image
        //     src={i.snippet.thumbnails.maxres.url}
        //     alt={i.snippet.title}
        //     width={i.snippet.thumbnails.maxres.width}
        //     height={i.snippet.thumbnails.maxres.height}
        //   />
        //   <Tags tags={i.snippet.tags} />
        // </div>
      ))}
    </div>
  );
}
