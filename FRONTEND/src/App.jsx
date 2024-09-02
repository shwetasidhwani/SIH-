import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Dhruv imports
import About from "./components/About";
import Analytics from "./components/Analytics/Analytics";




// Shweta imports
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ChatBot from "./components/Chatbot";


// Paritosh Imports
import TicketFare from "./components/TicketFare";
import ToFromSearch from "./components/ToFromSearch";
import Footer from "./components/Footer";
import NearestStation1 from "./components/NearestStations1";
import NearestStations from "./components/NearestStations";
import GLBViewer from "./components/GLBViewer";






// Joshua Imports







// Sujal imports







// Ashmit imports
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Logout from "./Authentication/Logout";
import QueryComponent from "./QueryComponent/QueryComponent";
import StationInfo from "./StationInfo/StationInfo";
import ChatRoom from "./ChatRoom.jsx/ChatRoom";








const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/protected",
          {
            credentials: "include",
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error in authenticated ", err);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      <BrowserRouter>
      <Navbar />
        <div className="content-wrapper">
          <Routes>
            {/* Dhruv routes */}
            <Route path="/about" element={<About/>} />
            <Route path="/analytics" element={<Analytics/>} />


            {/* Shweta Routes */}
            <Route path="/" element={<HomePage />} />




            {/* Paritosh Routes */}
            <Route path="/ticketfare" element={<TicketFare />} />
            <Route path="/toandfrom" element={<ToFromSearch />} />
            <Route path="/NearestStations" element={<NearestStations />} />
            <Route path="/model" element={<GLBViewer />} />




            {/* Joshua Routes  */}




            {/* Sujal Routes  */}




            {/* Ashmit Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/query" element={<QueryComponent />} />
            <Route path="/station" element={<StationInfo/>} />
            <Route path="/chat" element={<ChatRoom/>} />


            
          </Routes>
        {/* Always include footer */}
        </div>
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
