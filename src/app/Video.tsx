const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
import Image from "next/image";

async function getVideoDetails(videoId: string) {
  const res = await fetch(
    `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
  );

  if (!res.ok) throw new Error("failed to fetch video data");

  return res.json();
}

interface Props {
  videoId: string;
}

export default async function Video({ videoId }: Props) {
  const videoData: Video = await getVideoDetails(videoId);

  return (
    <div className="flex flex-col rounded bg-pink-600 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {videoData.items.map((i) => (
        <div key="">
          <p>{i.snippet.title}</p>
          <Image
            src={i.snippet.thumbnails.maxres.url}
            alt={i.snippet.title}
            width={i.snippet.thumbnails.maxres.width}
            height={i.snippet.thumbnails.maxres.height}
          />
          <ul className="flex flex-wrap gap-2">
            {i.snippet.tags.map((tag, index) => (
              <li
                key={index}
                className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
