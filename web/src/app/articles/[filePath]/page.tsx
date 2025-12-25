import Article from "../../../components/Article";

export default async function Page({
  params,
}: {
  params: Promise<{ filePath: string }>;
}) {
  const { filePath } = await params;

  return <Article filePath={filePath} />;
}
