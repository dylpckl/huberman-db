"use client"; // This is a client component because we can't pass props from a Client to a Server component
import useSWR from "swr";
import Image from "next/image";
import Tags from "./Tags";
import { supabase } from "@/app/lib/supabaseClient";
import { motion } from "framer-motion";

export const Video = ({ video }: Video) => {
  const publishedAt = new Date(video.published_at);

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
      <p className="mt-1 text-sm text-gray-500 truncate">{video.description}</p>
    </motion.div>
  );
};
