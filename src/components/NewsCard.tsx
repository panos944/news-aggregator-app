import type { Article } from "../types/news";

const NewsCard = () => {

  const placeholderArticle: Article = {
    id: '1',
    title: 'Μέτρα προφύλαξης από τον στρεπτόκοκκο',
    description: 'Πρώτα η παρουσία του σκύλου μαζί με τους ορειβάτες και έπειτα η χρήση του σπρέι πιπεριού είναι τα δύο στοιχεία που έπαιξαν καταλυτικό ρόλο στην αντίδραση της αρκούδας να χτυπήσει τον ένα από τους δύο.',
    imageUrl: 'https://www.real.gr/wp-content/uploads/2025/06/arkoyda.jpg', // A placeholder image
    source: 'Real.gr',
    url: '#'
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <a href={placeholderArticle.url} target="_blank" rel="noopener noreferer" className="flex flex-col flex-grow">
        <img className="w-full h-48 object-cover group-data-[size=large]:h-96 transition-all duration-300" src={placeholderArticle.imageUrl} alt={placeholderArticle.title}/>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{placeholderArticle.title}</h3>
          <p className="text-gray-600 text-sm">{placeholderArticle.description}</p>
        </div>
        </a>
      </div>
    </>
  )

}

export default NewsCard;