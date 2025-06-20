const SecondaryStory = ({title}: {title:string}) => {
  return (
    <>
      <a href="#" className="block hover:text-blue-600 transition-colors">
        <h4 className="text-md font-semibold text-gray-600">{title}</h4>
        <hr className="my-3 border-gray-200"/>
      </a>
    </>
  )
}

export default SecondaryStory;