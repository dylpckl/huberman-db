// VideoList component that accepts the result of filterVideos()
import { Video } from "@/app/Video";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 2.3,
    },
  },
};

export default function VideoGrid(videos) {
  //   console.log(videos);
  return (
    <AnimatePresence>
      <motion.div
        className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: 15 }}
        variants={variants}
      >
        {videos &&
          videos.videos.map((video: Video) => (
            <Video
              video={video}
              key={video.videoid}
            />
          ))}
      </motion.div>
    </AnimatePresence>
  );
}
