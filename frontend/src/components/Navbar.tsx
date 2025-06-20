import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return(
    <>
      <nav className="shadow-md bg-blue-900 p-2">
        <div className="flex justify-between container mx-auto py-4 items-center">
          <a href="/" className="text-3xl font-bold">
            <span className="text-white">Real</span>
            <span className="text-white mx-1">Group</span>
            <span className="text-yellow-500">News</span>
          </a>  
          
          <div className="font-bold space-x-6 text-white hidden lg:flex">
            <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
            <span className="text-white">|</span>
            <Link to="/source/real" className="hover:text-yellow-500 transition-colors">Real.gr</Link>
            <span className="text-white">|</span>
            <Link to="/source/instyle" className="hover:text-yellow-500 transition-colors">Instyle</Link>
            <span className="text-white">|</span>
            <Link to="/source/oloygeia" className="hover:text-yellow-500 transition-colors">Ολο Υγεία</Link>
            <span className="text-white"> |</span>
            <Link to="/source/thecars" className="hover:text-yellow-500 transition-colors">The Cars</Link>
            <span className="text-white"> |</span>
            <Link to="/source/realplayer" className="hover:text-yellow-500 transition-colors">Realplayer</Link>
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