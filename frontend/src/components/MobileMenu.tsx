import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void
}


const MobileMenu = ({isOpen, onClose, user, onLogout} : MobileMenuProps) => {
    if(!isOpen) {
      return null; // when not open do not render
    }

    const handleLinkClick = () => {
      onClose(); //
    }

    const handleLogout = () => {
      onLogout();
      onClose();
    }

    return (
    <>

    <div className="lg:hidden">
      <div className="font-bold text-white flex flex-col items-center py-3 space-y-4">
        <Link to="/" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">Home</Link>
        <Link to="/source/real" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">Real.gr</Link>
        <Link to="/source/instyle" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">Instyle</Link>
        <Link to="/source/realkiosk" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">Real Kiosk</Link>
        <Link to="/source/thecars" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">The Cars</Link>
        <Link to="/source/realplayer" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors">Realplayer</Link>

        {/* User info */}
        <div className="flex items-center space-x-2 text-center">
          <User size={16} className="text-yellow-500"/>
          <span className="text-sm">
            {user?.firstName} {user?.lastName}
          </span>
        {/* Logout */}
          <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white
          hover:bg-red-800 transition-colors">
            <LogOut size={16}/>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default MobileMenu;