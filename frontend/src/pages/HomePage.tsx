import NewsCard from "../components/NewsCard";
import SecondaryStory from "../components/SecondaryStory";
import NewsSection from "../components/NewsSection";
import LatestNewsFeed from "../components/LatestNewsFeed";
import { useEffect, useState } from "react";
import type { Article } from "../types/news";
import { logos } from "../data/logo-data";


// Creates a logoMap dynamically from the imported data by creating a lookup object

const logoMap = logos.reduce((acc, logo) => {
  acc[logo.name] = logo.imageUrl;
  return acc;
}, {} as Record<string, string>)

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesBySource, setArticlesBySource] = useState<{ [key: string]: Article[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest articles for hero/feed sections
        const latestResponse = await fetch("http://localhost:8000/api/articles/latest");
        if (!latestResponse.ok) {
          throw new Error("Failed to fetch latest articles");
        }
        const latestData: Article[] = await latestResponse.json();
        setArticles(latestData);

        // Fetch articles by source for news sections
        const sourceResponse = await fetch("http://localhost:8000/api/articles/by-sources");
        if (!sourceResponse.ok) {
          throw new Error("Failed to fetch articles by sources");
        }
        const sourceData: { [key: string]: Article[] } = await sourceResponse.json();
        setArticlesBySource(sourceData);

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Display loading and error states
  if (loading) return <div className="container mx-auto p-4 text-center">Loading articles...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  if (articles.length === 0) return <div className="container mx-auto p-4 text-center">No articles found.</div>;


  // --Data Slicing--
  const heroArticle = articles[0];
  const secondaryStories = articles.slice(1, 7) // Get the next 6 articles for the secondary section
  const latestFeedArticles = articles.slice(7, 47) // Get another 20 for the feed


  return (
    <>
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 group" data-size="large">
          {/* The main hero article uses the first article from our fetched data */}
          <NewsCard article={heroArticle}/>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">            
            Σχετική Ειδησεογραφία
          </h3>
          <div className="flex flex-col">
            {secondaryStories.map(story => (
              <SecondaryStory key={story.id || story.url} title={story.title}/>
            ))}
          </div>
        </div>
      </div>

      {/* News Sections by source - Now using the properly fetched data */}
      {Object.keys(articlesBySource).map((sourceName) => (
         <NewsSection
          key={sourceName}
          sourceId={sourceName.toLowerCase().replace(/\s/g, '')}
          logoUrl={logoMap[sourceName]}
          logoAlt={sourceName}
          articles={articlesBySource[sourceName]}
        />
      ))}

      {/* Latest News and Ads Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <LatestNewsFeed articles={latestFeedArticles} />
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage;