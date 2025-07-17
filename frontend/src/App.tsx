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

function App() {
  // Temporary state to show auth forms - we'll remove this later
  const [showAuth, setShowAuth] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Temporary: Show auth forms for design preview
  if (showAuth) {
    return (
      <AuthProvider>
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm/>
        )}
        
        {/* Temporary button to switch back to main app */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowAuth(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Main App
          </button>
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
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
      
      {/* Temporary button to show auth forms */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowAuth(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Preview Auth Forms
        </button>
      </div>
    </AuthProvider>
  )
}

export default App
