import type { Article } from "../types/news";
import LatestNewsItem from "./LatestNewsItem";

interface LatestNewsFeedProps {
  articles: Article[];
}

const LatestNewsFeed = ({ articles }: LatestNewsFeedProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6 border-gray-300 border-b pb-2 text-gray-800">
        Τελευταίες Ειδήσεις
      </h2>
      <div className="flex flex-col gap-y-8">
        {articles.map((article) => (
          <LatestNewsItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default LatestNewsFeed;

