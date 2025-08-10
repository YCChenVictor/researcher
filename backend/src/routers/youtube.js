// const { google } = require("googleapis")
// const fs = require('fs');
// const path = require('path');
// const youtube = google.youtube({ // going to extract to separate file
//   version: "v3",
//   auth: process.env.YoutubeAPIKey,
// })

// // youtube
// app.get("/search-youtube-with-googleapis", async (req, res, next) => {
//   try {
//     const searchQuery = req.query.search_query;
//     const response = await youtube.search.list({
//       part: "snippet",
//       q: searchQuery,
//     });

//     const titles = response.data.items.map((item) => item.snippet.title);
//     res.send(titles);
//   } catch (err) {
//     next(err);
//   }
// });
