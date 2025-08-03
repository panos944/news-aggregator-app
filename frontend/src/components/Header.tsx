import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/source/real');
  };

  const navigationItems = [
    { name: 'Real.gr', path: '/source/real' },
    { name: 'InStyle', path: '/source/instyle' },
    { name: 'Real Kiosk', path: '/source/realkiosk' },
    { name: 'RealPlayer', path: '/source/realplayer' },
  ];

  return (
    <nav className="shadow-md bg-blue-900 p-2">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center w-full">
          
          {/* Logo - Left on desktop, centered on mobile */}
          <div className="flex-shrink-0 lg:flex-shrink-0 flex-1 lg:flex-initial">
            <Link to="/" className="text-3xl font-bold whitespace-nowrap block text-center lg:text-left">
              <span className="text-white">Real</span>
              <span className="text-white mx-1">Group</span>
              <span className="text-yellow-500">News</span>
            </Link>
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
              <Link to="/source/realkiosk" className="hover:text-yellow-500 transition-colors">Real Kiosk</Link>
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
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className="flex items-center justify-center p-2"
                >
                  <Menu className="text-white h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-blue-900">Real Group</span>{' '}
                    <span className="text-yellow-500">News</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {user && (
                    <div className="pt-4 border-t border-gray-200 space-y-4">
                      <div className="flex items-center space-x-2 px-3">
                        <User className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Αποσύνδεση
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>   
    </nav>
  );
};

export default Header;