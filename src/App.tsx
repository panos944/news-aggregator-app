import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"

function App() {

  return (
    <>
    <TopBar/>
    <Navbar/>
    <main>
      <HomePage/>
    </main>
    <Footer/>
    </>
  )
}

export default App
