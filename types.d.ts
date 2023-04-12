type Video = {
  videoid: string;
  created_at: string;
  description: string?;
  title: string;
  published_at: string;
  thumbnail_url: string;
  thumbnail_height: string;
  thumbnail_width: string;
  tags: string[];
};

// type Video = {
//   kind: string;
//   etag: string;
//   items: [
//     {
//       kind: string;
//       etag: string;
//       id: string;
//       snippet: {
//         publishedAt: string;
//         channelId: string;
//         title: string;
//         description: string;
//         thumbnails: {
//           default: {
//             url: string;
//             width: number;
//             height: number;
//           };
//           medium: {
//             url: string;
//             width: number;
//             height: number;
//           };
//           high: {
//             url: string;
//             width: number;
//             height: number;
//           };
//           standard: {
//             url: string;
//             width: number;
//             height: number;
//           };
//           maxres: {
//             url: string;
//             width: number;
//             height: number;
//           };
//         };
//         channelTitle: string;
//         tags: string[];
//         categoryId: string;
//         liveBroadcastContent: string;
//         defaultLanguage: string;
//         localized: {
//           title: string;
//           description: string;
//         };
//         defaultAudioLanguage: string;
//       };
//       contentDetails: {
//         duration: string;
//         dimension: string;
//         definition: string;
//         caption: string;
//         licensedContent: true;
//         contentRating: {};
//         projection: string;
//       };
//       statistics: {
//         viewCount: string;
//         likeCount: string;
//         favoriteCount: string;
//         commentCount: string;
//       };
//     }
//   ];
//   pageInfo: {
//     totalResults: number;
//     resultsPerPage: number;
//   };
// };
