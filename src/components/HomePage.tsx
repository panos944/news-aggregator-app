import NewsCard from "./NewsCard";
import SecondaryStory from "./SecondaryStory";


const HomePage = () => {
  return (
    <>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 group" data-size="large">
          <NewsCard/>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">            
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

      <h2 className="text-2xl text-bold text-gray-800 mb-6 border-b-2 pb-2">
        Instyle
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
      </div>

    </div>
    </>
  )
}

export default HomePage;