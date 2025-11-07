import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import type { Article } from '../types/news';

interface HeaderProps {
  mostPopularArticles?: Article[];
}

const Header = ({ mostPopularArticles = [] }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user ? ([user.firstName, user.lastName].filter(Boolean).join(' ') || user.email) : '';

  const navigationItems = [
    { name: 'InStyle', path: '/source/instyle' },
    { name: 'Real Kiosk', path: '/source/realkiosk' },
    { name: 'RealPlayer', path: '/source/realplayer' },
  ];

  return (
    <>
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
                <Link to="/source/instyle" className="hover:text-yellow-500 transition-colors">Instyle</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/realkiosk" className="hover:text-yellow-500 transition-colors">Real Kiosk</Link>
                <span className="text-gray-300">|</span>
                <Link to="/source/realplayer" className="hover:text-yellow-500 transition-colors">Realplayer</Link>
              </div>
            </div>
           
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-auto">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                  <div className="h-3 w-24 rounded bg-white/30 animate-pulse" />
                </div>
              ) : isAuthenticated && user ? (
                <>
                  <User size={18} className="text-yellow-500"/>
                  <span className="text-white text-sm whitespace-nowrap">
                    {displayName}
                  </span>
                  <span className="text-gray-300 mx-2">|</span>
                  <button 
                    type="button"
                    onClick={handleLogout} 
                    className="flex items-center space-x-2 bg-red-600 text-white py-1 px-2 rounded text-xs hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    <LogOut size={20}/>
                    <span>Αποσύνδεση</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/source/instyle"
                  className="flex items-center space-x-2 border border-white/40 text-white py-1 px-3 rounded text-xs hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  <User size={18} className="text-yellow-500" />
                  <span>Σύνδεση</span>
                </Link>
              )}
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
                <SheetContent side="top" className="w-full bg-blue-900 border-none">
                  <SheetHeader>
                    <SheetTitle className="text-center">
                      <span className="text-white">Real Group</span>{' '}
                      <span className="text-yellow-500">News</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4 flex flex-col items-center">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-yellow-500 transition-colors"
                    >
                      Home
                    </Link>
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-yellow-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t border-white/20 space-y-4 flex flex-col items-center">
                      {loading ? (
                        <div className="flex items-center space-x-3">
                          <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                          <div className="h-4 w-24 rounded bg-white/30 animate-pulse" />
                        </div>
                      ) : isAuthenticated && user ? (
                        <>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-white">
                              {displayName}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Αποσύνδεση
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsOpen(false);
                            navigate('/source/instyle');
                          }}
                          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-blue-900 transition-colors"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Σύνδεση
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>   
      </nav>
      
      {/* Most Popular Ticker */}
      {mostPopularArticles.length > 0 && (
        <div className="w-full py-3 text-black" style={{ background: '#f5b400' }}>
          <div className="flex items-center gap-4 px-4">
            <span className="ny-serif-bold text-base flex-shrink-0 whitespace-nowrap text-black">Most Popular:</span>
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-scroll-fast whitespace-nowrap gap-8">
                {[...mostPopularArticles, ...mostPopularArticles].map((article, index) => (
                  <a 
                    key={`${article.id || article.url}-${index}`}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-blue-900 transition-colors flex-shrink-0"
                  >
                    <span className="ny-serif-bold text-base">
                      {(index % mostPopularArticles.length) + 1}.
                    </span>
                    <span className="ny-sans text-sm font-medium">
                      {article.title}
                    </span>
                    <span className="text-black/70 text-xs">
                      ({article.source})
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;