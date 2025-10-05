import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';       
import Market from './pages/Market';              
import Arena from './pages/Arena';               
import Tournament from './pages/Tournament';      
import DeckBuilder from './pages/DeckBuilder';    
import Profile from './pages/Profile';            
import Settings from './pages/Settings';          
import Achievements from './pages/Achievements';  
import About from './pages/About';                
import FAQ from './pages/Faq';                    
import Contact from './pages/Contact';            
import Leaderboard from './pages/Leaderboard';    
import Moves from './pages/Moves';                
import Analytics from './pages/Analytics';        


function App() {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        {/* Landing page - no navbar */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard with navbar */}
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Dashboard />
            </div>
          </>
        } />
        
        {/* Market with navbar */}
        <Route path="/market" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Market />
            </div>
          </>
        } />
        
        {/* Arena with navbar */}
        <Route path="/arena" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Arena />
            </div>
          </>
        } />

        {/* Tournament with navbar */}
        <Route path="/tournament" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Tournament />
            </div>
          </>
        } />
        
        {/* Moves with navbar */}
        <Route path="/moves" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Moves />
            </div>
          </>
        } />
        
        {/* Leaderboard with navbar */}
        <Route path="/leaderboard" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Leaderboard />
            </div>
          </>
        } />
        
        {/* Deck Builder with navbar */}
        <Route path="/deck-builder" element={
          <>
            <Navbar />
            <div className="pt-20">
              <DeckBuilder />
            </div>
          </>
        } />
        
        {/* Analytics with navbar */}
        <Route path="/analytics" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Analytics />
            </div>
          </>
        } />
        
        {/* Profile with navbar */}
        <Route path="/profile" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Profile />
            </div>
          </>
        } />
        
        {/* Settings with navbar */}
        <Route path="/settings" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Settings />
            </div>
          </>
        } />
        
        {/* Achievements with navbar */}
        <Route path="/achievements" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Achievements />
            </div>
          </>
        } />
        
        {/* About with navbar */}
        <Route path="/about" element={
          <>
            <Navbar />
            <div className="pt-20">
              <About />
            </div>
          </>
        } />
        
        {/* FAQ with navbar */}
        <Route path="/faq" element={
          <>
            <Navbar />
            <div className="pt-20">
              <FAQ />
            </div>
          </>
        } />
        
        {/* Contact with navbar */}
        <Route path="/contact" element={
          <>
            <Navbar />
            <div className="pt-20">
              <Contact />
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
