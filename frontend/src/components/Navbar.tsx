import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { LogOut, MenuIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, logout} = useAuth()

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout();
  }

  return(
    <>
      <nav className="shadow-md bg-blue-900 p-2">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center w-full">
            
            {/* Logo - Left on desktop, centered on mobile */}
            <div className="flex-shrink-0 lg:flex-shrink-0 flex-1 lg:flex-initial">
              <a href="/" className="text-3xl font-bold whitespace-nowrap block text-center lg:text-left">
                <span className="text-white">Real</span>
                <span className="text-white mx-1">Group</span>
                <span className="text-yellow-500">News</span>
              </a>
            </div>
            
            {/* Navigation Links - Center with maximum breathing space (desktop only) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="font-bold text-white flex items-center space-x-6 whitespace-nowrap">
                <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/real" className="hover:text-yellow-500 transition-colors">Real.gr</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/instyle" className="hover:text-yellow-500 transition-colors">Instyle</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/oloygeia" className="hover:text-yellow-500 transition-colors">Ολο Υγεία</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/thecars" className="hover:text-yellow-500 transition-colors">The Cars</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/realplayer" className="hover:text-yellow-500 transition-colors">Realplayer</Link>
              </div>
            </div>
           
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0 ml-auto">
              <User size={18} className="text-yellow-500"/>
              <span className="text-white text-sm whitespace-nowrap">
                {user?.firstName} {user?.lastName}
              </span>
              
              <span className="text-gray-300 mx-2">|</span>
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-2 bg-red-600 text-white py-1 px-2 rounded text-xs hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <LogOut size={20}/>
                <span>Αποσύνδεση</span>
              </button>
            </div>

            {/* Mobile Menu Button - Fixed position on right */}
            <div className="lg:hidden flex-shrink-0">
              <button 
                className="flex items-center justify-center p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="text-white h-6 w-6" />
              </button>
            </div>
          </div>
        </div>   

        <MobileMenu isOpen={isMenuOpen} onClose={closeMobileMenu} user={user} onLogout={handleLogout}/>
      </nav>
    </>
  )
}

export default Navbar;