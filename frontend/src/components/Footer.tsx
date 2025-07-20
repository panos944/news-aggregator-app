import { Mail, Phone } from "lucide-react";
import LogoCloud from "./LogoCloud";

const Footer = () => {
  return(
    <>
      <LogoCloud/>
      <footer className="bg-blue-900 text-white text-sm py-12 border-gray-200">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Copyright Section */}
            <div className="text-center lg:text-left">
              <div className="font-bold text-base">
                <span>© {new Date().getFullYear()}</span>
                <span className="mx-1">Real</span>
                <span>News</span>
                <span className="text-yellow-500 ml-1">Group</span>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className=" flex-col items-center space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-500" />
                <span className="text-white">(+30) 211 200 8300</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-500" />
                <a href="mailto:info@real.gr" className="text-white hover:text-yellow-400 transition-colors">
                  info@real.gr
                </a>
              </div>
            </div>
            
            {/* Links Section */}
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 text-center">
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                Όροι Χρήσης
              </a>
              <span className="hidden lg:inline text-gray-300">|</span>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                Πολιτική Απορρήτου
              </a>
              <span className="hidden lg:inline text-gray-300">|</span>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                Επικοινωνία
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;