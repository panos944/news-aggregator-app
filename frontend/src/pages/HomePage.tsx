import NewsCard from "../components/NewsCard";
import SecondaryStory from "../components/SecondaryStory";
import NewsSection from "../components/NewsSection";
import { mockArticles } from "../data/mock-data";
import { sectionsData } from "../data/sections"; 
import LatestNewsFeed from "../components/LatestNewsFeed";


const HomePage = () => {
  
  const heroArticle = mockArticles[0];

  return (
    <>
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 group" data-size="large">
          <NewsCard article={heroArticle}/>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">            
            Σχετική Ειδησεογραφία
          </h3>
          <div className="flex flex-col">
            <SecondaryStory title="Ρύθμιση Πιερρακάκη: Ξεμπλοκάρουν οι μεταβιβάσεις και οι γονικές παροχές" />
            <SecondaryStory title="Τουλάχιστον 8 νεκροί από επίθεση σε σχολείο στην Αυστρία" />
            <SecondaryStory title="H Nάταλι Πόρτμαν παραδίδει μαθήματα άψογου καλοκαιρινού στυλ" />
            <SecondaryStory title="ΓΕΚ ΤΕΡΝΑ: Ολοκληρώθηκε το deal με το Latsco Family Office" />
            <SecondaryStory title="H Nάταλι Πόρτμαν παραδίδει μαθήματα άψογου καλοκαιρινού στυλ" />
            <SecondaryStory title="Ρύθμιση Πιερρακάκη: Ξεμπλοκάρουν οι μεταβιβάσεις και οι γονικές παροχές" />
          </div>
        </div>
      </div>

      {/* News Sections */}
      {sectionsData.map((section) => (
        <NewsSection
        key={section.name}
        sourceId={section.id}
        logoUrl={section.logoUrl}
        logoAlt={section.name}
        articles={section.articles}/>
      ))}

      {/* Latest News and Ads Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <LatestNewsFeed articles={mockArticles} />
        </div>
        {/* <div className="lg:col-span-1">
          <div className="sticky top-4 bg-gray-100 p-4 rounded-lg h-96 flex items-center justify-center">
            <span className="text-gray-500"></span>
          </div>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default HomePage;