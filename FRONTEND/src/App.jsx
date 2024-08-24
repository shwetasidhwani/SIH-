//<------------------IMPORTS SECTION ---------------------------->

//Standard Imports
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';


//Dhruv imports








//Shweta imports






//Paritosh Imports







//Joshua Imports







//Sujal imports








//Ashmit imports
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Logout from './Authentication/Logout';





const  App = () =>  {
  const [isAuthenticated , setisAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/auth/protected',{
          credentials : 'include'
        });
        if(response.status === 200){
          setisAuthenticated(true);
        }
      }
      catch(err){
        console.error("Error in authenticated ", err);
      }
    };
     checkAuth();
  }, []);

  const handleLogin = () => {
    setisAuthenticated(true);
  }

  const handleLogout = () => {
    setisAuthenticated(false);
  }

  return (
    <>
    <BrowserRouter>
    <Routes>
    {/* Dhruv routes */}




    {/* Shweta Routes */}




    {/* Paritosh Routes */}




    {/* Joshua Routes  */}




    {/* Sujal Routes  */}




    {/* Ashmit Routes   */}
    <Route path='/login' element={<Login onLogin = {handleLogin}/>}/>  
    <Route path='/logout' element={<Logout onLogout = {handleLogout}/>}/>  
    <Route path='/signup' element = {<Signup/>}/>
    


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
