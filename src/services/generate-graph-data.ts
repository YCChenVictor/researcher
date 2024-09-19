import randomColor from "randomcolor";
import crawl from "crawl-website-connectedness";

const getIdFromNodeName = (
  nodes: { id: number; name: string; url: string; group: number }[],
  url: string,
) => {
  const result = nodes.find((node) => node.url === url);
  if (result) {
    return result.id;
  } else {
    null;
  }
};

const giveColorByGroupTo = (
  nodes: {
    id: number;
    name: string;
    url: string;
    group: number;
    color?: string;
  }[],
) => {
  const groups = [...new Set(nodes.map((node) => node.group))];
  const colors = randomColor({ count: groups.length });
  nodes.map((node) => {
    node.color = colors[groups.indexOf(node.group)];
  });
  return nodes;
};

const desiredFormat = (structure: object) => {
  let nodes: { id: number; name: string; url: string; group: number }[];
  const links = Object.entries(structure)
    .map(([key, value]) => {
      return value.map((item: string) => {
        // Explicitly specify the type of 'item' as string
        const source = getIdFromNodeName(nodes, key);
        const target = getIdFromNodeName(nodes, item);
        if (source && target) {
          return { source: source, target: target };
        }
      });
    })
    .flat()
    .filter((obj) => obj !== undefined);
  nodes = Object.keys(structure).map((value, index) => {
    let name = value.split("/").slice(-1)[0];
    if (name === "main") {
      name = value.split("/").slice(-2)[0];
    }
    return {
      id: index + 1,
      name: name,
      url: value,
      group: value.split("/").length - 2,
    };
  });
  nodes = giveColorByGroupTo(nodes);

  return { nodes: nodes, links: links };
};

const generateGraphData = async () => {
  const result = await crawl(
    ["https://ycchenvictor.netlify.app/web-development/"], // URLs to crawl (queue)
    "https://ycchenvictor.netlify.app/", // Base URL
    "https://ycchenvictor.netlify.app/", // Required string in each URL
    true, // If true, it will log out the progress
    new Set([
      "https://ycchenvictor.netlify.app/",
      "https://ycchenvictor.netlify.app/software-dashboard",
    ]), // visited. You can add URLs here to prevent the crawler from visiting them
  );
  return desiredFormat(result);
};

export default generateGraphData;
