import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import { Route, Routes } from "react-router-dom"
import SourcePage from "./pages/SourcePage"

function App() {

  return (
    <>
    <TopBar/>
    <Navbar/>
    <main>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage/>}/>
        {/* Other Pages */}
        <Route path="/source/:sourceId" element={<SourcePage/>}/>
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
