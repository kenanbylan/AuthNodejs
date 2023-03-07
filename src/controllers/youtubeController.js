const { google } = require("googleapis");
require("dotenv").config();
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const youtube = google.youtube({
  version: "v3",
  auth: "AIzaSyDViRgGFcrAH4EgaoEVbeIGyF4Uzo5xsoc", // YouTube Data API v3 API anahtarınızı buraya ekleyin
});

// async function getChannelId(channelName) {
//   const youtube = google.youtube({
//     version: "v3",
//     auth: "AIzaSyDViRgGFcrAH4EgaoEVbeIGyF4Uzo5xsoc",
//   });

//   // const url =
//   //   "https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&maxResults=10&q=AndreoBee&type=channel&key=[YOUR_API_KEY]";

//   const res = await youtube.channels.list({
//     part: "snippet,id",
//     forUsername: channelName,
//   });
//   if (res.data) {
//     return res.data;
//   } else {
//     return null;
//   }
// }

// const getChannel = async (req, res) => {
//   const { channelName } = req.body;

//   var myChannels = null;
//   var service = google.youtube({
//     version: "v3",
//     auth: "AIzaSyDViRgGFcrAH4EgaoEVbeIGyF4Uzo5xsoc",
//   });

//   service.channels.list(
//     {
//       part: "snippet,contentDetails,statistics",
//       forUsername: channelName,
//     },
//     function (err, response) {
//       if (err) {
//         console.log("The API returned an error: " + err);
//         throw new APIError("The API returned an error: " + err, 401);
//       }

//       var channels = response.data.items;
//       if (channels.length == 0) {
//         console.log("No channel found.");
//       } else {
//         myChannels = channels[0].id;

//         res.status(200).json({
//           status: "success",
//           data: myChannels ? myChannels : null,
//           message: "Channel found",
//         });
//       }
//     }
//   );
// };

const getChannel = async (req, res) => {
  const { channelName } = req.body;

  const response = await youtube.channels.list({
    //part: "id",
    part: "contentDetails",
    forUsername: channelName,
  });

  const channelId = response.data.items[0].id;

  return new Response({
    data: response,
    message: "Channel found",
  }).success(res);
};

module.exports = {
  getChannel,
};
