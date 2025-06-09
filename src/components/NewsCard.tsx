import type { Article } from "../types/news";

const NewsCard = () => {

  const placeholderArticle: Article = {
    id: '1',
    title: 'Μέτρα προφύλαξης από τον στρεπτόκοκκο',
    description: 'Αναλυτικές οδηγίες από τον ΕΟΔΥ για την προστασία από τον στρεπτόκοκκο Α, με έμφαση στα παιδιά.',
    imageUrl: 'https://www.real.gr/wp-content/uploads/2025/06/arkoyda.jpg', // A placeholder image
    source: 'Real.gr',
    url: '#'
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <a href={placeholderArticle.url} target="_blank" rel="noopener noreferer">
        <img className="w-full h-48 object-cover" src={placeholderArticle.imageUrl} alt={placeholderArticle.title}/>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{placeholderArticle.title}</h3>
          <p className="text-gray-600 text-sm">{placeholderArticle.description}</p>
        </div>
        </a>
      </div>
    </>
  )

}

export default NewsCard;