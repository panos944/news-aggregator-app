import { useState } from "react";
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import { AuthProvider } from "./contexts/AuthContext"
import { Route, Routes } from "react-router-dom"
import SourcePage from "./pages/SourcePage"
import PrivateRoute from "./components/PrivateRoute";

function App() {


  return (
    <AuthProvider>
      <PrivateRoute>
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
      </PrivateRoute>
    </AuthProvider>
  )
}

export default App
