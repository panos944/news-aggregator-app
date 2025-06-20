const logos = [
  {name: "Real.gr", url: "#", imageUrl: "https://www.real.gr/wp-content/themes/realnews/images/realgr-logo.svg"},
  {name: "Instyle.gr", url: "#", imageUrl:"https://www.instyle.gr/wp-content/uploads/2022/05/Logo_InStyle-1.png"},
  {name: "Oloygeia.gr", url:"#", imageUrl: "https://www.oloygeia.gr/wp-content/uploads/2023/06/olo-ygeia-logo-red.png"},
  {name: "The Cars", url:"#", imageUrl: "https://www.thecars.gr/wp-content/uploads/2023/05/the-cars-logo-330x44-1.png"},
  { name: 'Realplayer', url: '#', imageUrl: 'https://player.real.gr/wp-content/uploads/2024/06/Logo-e1718700920635.png' },
]

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