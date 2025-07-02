import {logos} from "../data/logo-data";


const LogoCloud = () => {

  return(
    <>
      <div className="bg-blue-900 py-8 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {logos.map((logo) => (
            <a href={logo.url} key={logo.name} target="_blank" rel="noopener noreferrer">
            <img 
            className="h-7 object-contain hover:opacity-75 transition-opacity" 
            src={logo.imageUrl} 
            alt={logo.name} />
            </a>
          ))}
          </div>
        </div>
      </div>
    </>
  )

}

export default LogoCloud;