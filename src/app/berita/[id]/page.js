import { newsData } from "../../../components/NewsCard";
import NewsDetail from "../../../components/NewsDetail";

export function generateStaticParams() {
  return newsData.map((article) => ({ id: String(article.id) }));
}

export default async function BeritaDetailPage({ params }) {
  const { id } = await params;
  return <NewsDetail id={id} />;
}
