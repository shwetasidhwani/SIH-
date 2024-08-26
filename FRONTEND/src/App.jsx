import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Dhruv imports




// Shweta imports
import HomePage from "./components/HomePage";




// Paritosh Imports
import TicketFare from "./components/TicketFare";
import ToFromSearch from "./components/ToFromSearch";
import Footer from "./components/Footer";







// Joshua Imports







// Sujal imports







// Ashmit imports
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import Logout from "./Authentication/Logout";
import QueryComponent from "./QueryComponent/QueryComponent";
import StationInfo from "./StationInfo/StationInfo";









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
        <div className="content-wrapper">
          <Routes>
            {/* Dhruv routes */}

            {/* Shweta Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Paritosh Routes */}
            <Route path="/ticketfare" element={<TicketFare />} />
            <Route path="/toandfrom" element={<ToFromSearch />} />

            {/* Joshua Routes  */}

            {/* Sujal Routes  */}

            {/* Ashmit Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/query" element={<QueryComponent />} />
            <Route path="/station" element={<StationInfo />} />
          </Routes>
        </div>
        {/* Always include footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
