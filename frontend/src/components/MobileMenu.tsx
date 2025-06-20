import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
}


const MobileMenu = ({isOpen} : MobileMenuProps) => {
    if(!isOpen) {
      return null; // when not open do not render
    }

    return (
    <>

    <div className="lg:hidden">
      <div className="font-bold text-white flex flex-col items-center py-3 divide-y">
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


        <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Login</a>
        <a href="" className="block px-3 py-2 mt-3 rounded-md text-base font-medium bg-yellow-500 text-blue-900">Register</a>
      </div>
    </div>
    </>
  )
}

export default MobileMenu;