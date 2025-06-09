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
      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Home</a>
      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Real.gr</a>
      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Instyle</a>
      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Ολο Υγεία</a>
      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">The Cars</a>


      <a href="" className="w-full text-center py-3 text-white hover:bg-yellow-500 transition-colors">Login</a>
      <a href="" className="block px-3 py-2 mt-3 rounded-md text-base font-medium bg-yellow-500 text-blue-900">Register</a>
    </div>
    </div>
    </>
  )
}

export default MobileMenu;