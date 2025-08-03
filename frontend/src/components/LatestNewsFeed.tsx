import type { Article } from "../types/news";
import LatestNewsItem from "./LatestNewsItem";

interface LatestNewsFeedProps {
  articles: Article[];
}

const LatestNewsFeed = ({ articles }: LatestNewsFeedProps) => {
  return (
    <section className="bg-white">
      {/* Elegant Section Title */}
      <h2 className="font-serif text-3xl font-normal text-black mb-8 tracking-tight">
        Τελευταίες Ειδήσεις
      </h2>
      
      {/* Clean 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <LatestNewsItem key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default LatestNewsFeed;