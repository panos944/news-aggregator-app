import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return(
    <>
      <nav className="shadow-md bg-blue-900 p-2">
        <div className="flex justify-between container mx-auto py-4 items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Real</span>
            <span className="text-white mx-1">Group</span>
            <span className="text-yellow-500">News</span>
          </h1>
          <div className="font-bold space-x-6 text-white hidden lg:flex">
            <a href="" className="hover:text-yellow-500 transition-colors">Home</a>
            <span className="text-white">|</span>
            <a href="" className="hover:text-yellow-500 transition-colors">Real.gr</a>
            <span className="text-white">|</span>
            <a href="" className="hover:text-yellow-500 transition-colors">Instyle</a>
            <span className="text-white">|</span>
            <a href="" className="hover:text-yellow-500 transition-colors">Ολο Υγεία</a>
            <span className="text-white"> |</span>
            <a href="" className="hover:text-yellow-500 transition-colors">The Cars</a>
            <span className="text-white"> |</span>
            <a href="" className="hover:text-yellow-500 transition-colors">Realplayer</a>
          </div>

          <div className="text-yellow-500 space-x-4 font-bold hidden lg:flex items-center">
            <a href="">Login</a>
            <span>|</span>
            <a href="" className="bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400">Register</a>
          </div>

          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="text-white h-6 w-6" />
          </button>
        </div>   

        <MobileMenu isOpen={isMenuOpen}/>
      </nav>
    </>
  )

}

export default Navbar;