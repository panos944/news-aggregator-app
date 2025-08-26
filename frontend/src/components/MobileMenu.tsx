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
    {/* Overlay */}
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      {/* Mobile Menu */}
      <div 
        className="absolute top-0 left-0 right-0 bg-blue-900 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-bold text-white flex flex-col items-center py-6 space-y-4">
          <Link to="/" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">Home</Link>
          <Link to="/source/real" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">Real.gr</Link>
          <Link to="/source/instyle" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">Instyle</Link>
          <Link to="/source/realkiosk" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">Real Kiosk</Link>
          <Link to="/source/thecars" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">The Cars</Link>
          <Link to="/source/realplayer" onClick={handleLinkClick} className="hover:text-yellow-500 transition-colors py-2">Realplayer</Link>

          {/* User info - Fixed mobile layout */}
          <div className="flex flex-col items-center space-y-3 pt-4 border-t border-white/20 w-full max-w-xs">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-yellow-500"/>
              <span className="text-sm">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white
              hover:bg-red-800 transition-colors">
              <LogOut size={16}/>
              <span>Αποσύνδεση</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MobileMenu;