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
        <div className="flex justify-center lg:justify-between container mx-auto py-4 items-center px-4">
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
            <div>
              <User size={18} className="text-white"/>
              <span className="text-white text-sm">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <span className="text-white">|</span>
            <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-600 text-white py-2 px-4
            rounded-md hover:bg-red-700 transition-colors">
              <LogOut size={14}/>
              <span className="text-sm">Αποσύνδεση</span>
            </button>
          </div>

          <button 
            className="lg:hidden absolute right-4 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="text-white h-6 w-6" />
          </button>
        </div>   

        <MobileMenu isOpen={isMenuOpen} onClose={closeMobileMenu} user={user} onLogout = {handleLogout}/>
      </nav>
    </>
  )
}

export default Navbar;