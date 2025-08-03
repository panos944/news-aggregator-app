const SecondaryStory = ({title, url}: {title:string, url:string}) => {
  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600 transition-colors">
        <h4 className="text-md font-semibold text-gray-600">{title}</h4>
        <hr className="my-3 border-gray-200"/>
      </a>
    </>
  )
}

export default SecondaryStory;