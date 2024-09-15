const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const randomColor = require("randomcolor");
const path = require("path");
const fs = require("fs");

const searchbar = (app) => {
  app.get("/searchbar", async () => {
    const items = [];

    crawl = () => {
      const items = [];

      return new Promise((resolve, reject) => {
        request(articleList, (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            const $ = cheerio.load(body);
            $('a[href^="/blog"][href$=".html"]').each((i, link) => {
              const href = $(link).attr("href");
              const startIndex = href.indexOf("/blog/") + "/blog/".length;
              const endIndex = href.indexOf("/", startIndex);
              const category = href.substring(startIndex, endIndex);
              const absoluteUrl = domain + href;
              request(absoluteUrl, (err, response, body) => {
                if (err) {
                  reject(err);
                } else {
                  const $article = cheerio.load(body);
                  const title = $article("h1").text();
                  const content = $article
                    .text()
                    .replace(/(\r\n|\n|\r)/gm, "")
                    .replace(/ +(?= )/g, "");
                  items.push({
                    id: i,
                    title: title,
                    content: content,
                    url: href,
                    category: category,
                  });
                  if (
                    items.length === $('a[href^="/blog"][href$=".html"]').length
                  ) {
                    resolve({ items });
                  }
                }
              });
            });
          }
        });
      });
    };

    storeAsFile = (result) => {
      // Convert JSON data to a string
      const jsonString = JSON.stringify(result);

      // Write the JSON data to a file
      fs.writeFile("./data/searchBar.json", jsonString, function (err) {
        if (err) throw err;
        console.log("Saved!");
      });
    };

    crawl().then((structure) => {
      storeAsFile(structure);
    });
  });
};

module.exports = searchbar;
