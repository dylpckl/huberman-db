"use client"; // This is a client component because we can't pass props from a Client to a Server component
import useSWR from "swr";
import Image from "next/image";
import Tags from "./Tags";
import { supabase } from "@/app/lib/supabaseClient";
import { motion } from "framer-motion";

export const Video = ({ video }: Video) => {
  const publishedAt = new Date(video.published_at);

  const trimmedTitle = (title: string) => {
    return title.split("|")[0];
  };

  const videoNumber = (title: string) => {
    return title.split("#")[1];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
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
      {/* <p>{video.title}</p> */}
      <p>{videoNumber(video.title)}</p>
      {/* Title & Description */}
      <div className="flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
        <h3>
          <a href={`https://www.youtube.com/watch?v=${video.videoid}`}>
            <span
              aria-hidden="true"
              className=""
            />
            {trimmedTitle(video.title)}
          </a>
        </h3>
      </div>
      <p className="mt-1 text-sm text-gray-500 line-clamp-6">
        {video.description}
      </p>

      <div className=" flex gap-2 border-2 border-gray-400 rounded-full items-start w-1/2 p-2">
        <button className="">Watch Video</button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </motion.div>
  );
};
