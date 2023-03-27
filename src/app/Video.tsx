const url = "https://youtube.googleapis.com/youtube/v3/";
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function getVideoDetails(videoId) {
  const res = await fetch(
    `${url}videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${apiKey}`
  );
  //   const res = await fetch(
  //     `${url}videos?part=contentDetails,snippet,statistics&id=K-TW2Chpz4k&key=${apiKey}`
  //   );

  console.log(videoId, res.status);
  if (!res.ok) throw new Error("failed to fetch video data");

  return res.json();
}

// type Props = {
//   promise: Promise<Video[]>;
// };

interface Props {
  videoId: string;
}

export default async function Video({ videoId }: Props) {
  const videoData: Video = await getVideoDetails(videoId);
  console.log(videoData);
  //   const content = <div>hi</div>;
  const content = videoData.items.map((i) => {
    return (
      <>
        <p>{i.snippet.title}</p>
      </>
    );
  });

  return content;
}
