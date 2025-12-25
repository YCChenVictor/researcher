import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "YCChenVictor/Articles",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "slug",
      path: "articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        slug: fields.slug({ name: { label: "Slug source" } }),
        content: fields.mdx({ label: "Content", extension: "md" }),
      },
    }),
  },
});
