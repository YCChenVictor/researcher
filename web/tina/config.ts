import { defineConfig } from "tinacms";
import type { Form, TinaCMS } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const ensureMd = (s: string) => (s.endsWith(".md") ? s : `${s}.md`);

const pathFromForm = (form: Form, collectionPath: string) => {
  const id = String(form.id ?? "");
  // Often already like: "content/articles/xxx.md"
  if (id.startsWith(collectionPath + "/")) return ensureMd(id);

  const base = id.split("/").pop() ?? id;
  return `${collectionPath}/${ensureMd(base)}`;
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "public",
    outputFolder: "edit",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/articles",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
          beforeSubmit: async ({
            values,
            form,
          }: {
            values: Record<string, unknown>;
            cms: TinaCMS;
            form: Form;
          }) => {
            const path = pathFromForm(form, "articles");

            const res = await fetch("/api/articles", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                path,
                content: JSON.stringify(values, null, 2),
              }),
            });

            if (!res.ok)
              throw new Error(`PUT /api/articles failed: ${res.status}`);

            return values;
          },
        },
      },
    ],
  },
});
