import { Link } from "react-router-dom";
import type { Article } from "../types/news";
import NewsCard from "./NewsCard";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsSectionProps {
  logoUrl: string;
  logoAlt: string;
  articles: Article[];
  sourceId: string;
}

// Custom Carousel Arrows
const CustomPrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
    aria-label="Previous"
  >
    <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-pink-600 transition-colors" />
  </button>
);

const CustomNextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
    aria-label="Next"
  >
    <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-pink-600 transition-colors" />
  </button>
);

const NewsSection = ({ logoUrl, articles, logoAlt, sourceId }: NewsSectionProps) => {
  
  if (!articles || articles.length === 0) {
    return null;
  }

  // Check if this is the Instyle section
  const isInstyle = sourceId === 'instyle' || logoAlt === 'Instyle';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Instyle section with Editor's Pick style layout
  if (isInstyle) {
    const [featuredArticle] = articles;
    const carouselArticles = articles.slice(1);

    return (
      <section className="relative mb-16">
        {/* Full-width background */}
        <div className="absolute inset-0 -left-[100vw] -right-[100vw] bg-[#FFECDF]"></div>
        
        <div className="relative py-12">
          {/* Section Title */}
          <div className="text-center mb-10">
            <Link 
              to={`/source/${sourceId}`}
              className="group inline-block"
            >
              <img 
                src={logoUrl} 
                alt={`${logoAlt} Logo`} 
                className="h-12 mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-3"
              />
            </Link>
            <div className="w-24 h-px bg-pink-400 mx-auto"></div>
          </div>
          
          {/* Main Featured Article */}
          {featuredArticle && (
            <article className="group max-w-4xl mx-auto mb-10">
              <a 
                href={featuredArticle.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Featured Image */}
                  <div className="order-2 lg:order-1 overflow-hidden rounded-lg">
                    <img 
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="w-full h-64 lg:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 lg:order-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="ny-sans-medium text-xs text-pink-600 uppercase tracking-widest">
                        {featuredArticle.source}
                      </span>
                      <span className="text-gray-600">•</span>
                      <time className="ny-sans text-xs text-gray-600">
                        {formatDate(featuredArticle.publishedAt)}
                      </time>
                    </div>
                    
                    <h3 className="ny-serif-bold text-3xl md:text-4xl leading-tight ny-text-primary group-hover:text-pink-600 transition-colors">
                      {featuredArticle.title}
                    </h3>
                    
                    <p className="ny-lora text-xl leading-relaxed ny-text-secondary">
                      {featuredArticle.description?.slice(0, 180)}...
                    </p>
                  </div>
                </div>
              </a>
            </article>
          )}

          {/* Carousel for Additional Articles */}
          {carouselArticles.length > 0 && (
            <div className="relative">
              <h3 className="ny-serif-bold text-3xl ny-text-primary mb-6 text-center">More from Instyle</h3>
              <Slider
                {...{
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 4000,
                  arrows: true,
                  prevArrow: <CustomPrevArrow />,
                  nextArrow: <CustomNextArrow />,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      }
                    }
                  ]
                }}
                className="instyle-carousel"
              >
                {carouselArticles.map((article) => (
                  <div key={article.id || article.url} className="px-4">
                    <article className="group">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 h-full transition-all duration-300 hover:bg-white/80 hover:shadow-lg">
                          {/* Image */}
                          <div className="mb-3 overflow-hidden rounded-lg">
                            <img 
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="ny-sans-medium text-xs text-pink-600 uppercase tracking-widest">
                                {article.source}
                              </span>
                              <span className="text-gray-500">•</span>
                              <time className="ny-sans text-xs text-gray-600">
                                {formatDate(article.publishedAt)}
                              </time>
                            </div>
                            
                            <h4 className="ny-serif-bold text-xl leading-tight ny-text-primary group-hover:text-pink-600 transition-colors line-clamp-3">
                              {article.title}
                            </h4>
                            
                            <p className="ny-lora text-base leading-relaxed ny-text-secondary line-clamp-2">
                              {article.description?.slice(0, 100)}...
                            </p>
                          </div>
                        </div>
                      </a>
                    </article>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>
    );
  }
  
  // Default layout for other sources
  return(
    <>
      <section className="mb-16">
        {/* Section Header - New Yorker inspired */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <Link 
            to={`/source/${sourceId}`}
            className="group inline-flex items-center"
          >
            <img 
              src={logoUrl} 
              alt={`${logoAlt} Logo`} 
              className="h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>
        
        {/* Articles Grid - 4 articles per line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default NewsSection;