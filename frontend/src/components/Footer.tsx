import { Mail, Phone } from "lucide-react";
import LogoCloud from "./LogoCloud";

const Footer = () => {
return(
  <>
    <LogoCloud/>
    <footer className="bg-blue-900 text-white text-sm py-10 border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-1 md:space-y-0">
        <div className="space-x-1 font-bold">
          <span>© {new Date().getFullYear()}</span>
          <span>Real</span>
          <span>News</span>
          <span className="text-yellow-500">Group</span>
        </div>
        <div className="flex flex-col items-center md:items-center space-y-1">
          {/* Sub-item 1: Phone */}
          <div className="flex items-center">
            <Phone size={14} className="mr-2" />
            <span>(+30) 211 200 8300</span>
          </div>
          {/* Sub-item 2: Mail */}
          <div className="flex items-center">
            <Mail size={14} className="mr-2" />
            <a href="mailto:info@real.gr" className="hover:text-yellow-400">info@real.gr</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="" className="hover:text-yellow-400 transition-colors">Όροι Χρήσης</a>
          <a href="" className="hover:text-yellow-400 transition-colors">Πολιτική Απορρήτου</a>
          <a href="" className="hover:text-yellow-400 transition-colors">Επικοινωνία</a>
        </div>
      </div>
    </footer>
  </>
)
}

export default Footer;