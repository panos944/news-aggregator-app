import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import SourcePage from './pages/SourcePage';
import AuthCallback from '../src/pages/AuthCallbackPage';
import './App.css';
import RealPlayerAdmin from './components/RealPlayerAdmin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route 
              path="/source/:sourceName" 
              element={
                <PrivateRoute>
                  <SourcePage/>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/realplayer-admin" 
              element={
                <PrivateRoute>
                  <RealPlayerAdmin />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
