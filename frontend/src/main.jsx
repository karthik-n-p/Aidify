import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/StudentPages/Login';
import SignUpPage from './pages/StudentPages/SignUp';
import AuthContext from './pages/StudentPages/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './pages/StudentPages/firebase-auth';


import { ChakraProvider, extendTheme } from '@chakra-ui/react'; // Import ChakraProvider and extendTheme
import Landing from './pages/StudentPages/Landing';
import Sidebar from './components/landing-page/Navbar';
import Header from './components/landing-page/header';


import BusAdmin from './pages/AdminPages/BusAdmin';




import './index.css';


import axios from 'axios';


import GrevanceStudentAdmin from './pages/AdminPages/GrevanceStudentAdmin';
import Store from './pages/StudentPages/Store';
import GrievanceStudent from './pages/StudentPages/GrevanceStudent';
import GrievanceNewTicket from './pages/StudentPages/GrievanceNewTicket';
import Marketplace from './pages/StudentPages/Store'; 
import Bus from './pages/StudentPages/Bus';


// Create a custom theme with the desired default color mode (dark)
const customTheme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
    normal: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    semibold: 'Poppins-SemiBold',
  },
  colors: {
    bg: '#ECECEC',
    btng: '#0080FF',
    grey2: '#718096',
    white: '#FFFFFF',
    txtw: '#FFFFFF',
    txtg: '#C7C9D3',
    grey1: '#A0AEC0',
    txtb: '#000000',
  },

  styles: {
    global: {
      body: {
        color: 'txtb',
        bg: 'bg',
      },
    },
  },

 

 
});

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [isadmin, setIsadmin] = useState(false);
  const [isdoctor, setIsdoctor] = useState(false);
  const [uid ,setuid] =useState('')


  
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');

    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      setIsRegistered(true);
      setUsername(authData.username);
      setIsadmin(authData.isadmin);
      setIsdoctor(authData.isdoctor);
     
    }
  }, []);




  const handleSignupSuccess = async (userdata, isAdmin) => {
    setIsadmin(isAdmin);
    
    try {
      const user = auth.currentUser;
      const isadmin = isAdmin;
      console.log("user",user.email);
   
  
      if (user) {
        // Check if the user's email contains a specific domain associated with doctors
        
    
        const userDoc = await getDoc(doc(firestore, 'username', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          console.log(userData.username,"bb")
          setIsRegistered(true);

          console.log("user data  ",user);
          
  
          localStorage.setItem('authData', JSON.stringify({ username: userData.username, uid: user.uid, isadmin: isAdmin, email: user.email }));

          //now to retrive local storage data we can use localStorage.getItem('authData')
        
        }
        else{
          console.log("user data of user ",user);
          setUsername(user.displayName);
          setIsRegistered(true);
          localStorage.setItem('authData', JSON.stringify({ username: user.displayName, uid: user.uid, isadmin: isAdmin , email: user.email}));
        
        }
      
      }
    } catch (error) {
      setIsRegistered(false);
      console.log(error);
    }
  };


  const afterlogout = () => {
    setIsRegistered(false);
    setUsername('');
    setIsadmin(false);

    localStorage.removeItem('authData');

    
  };

  return (
    <React.StrictMode>
      <AuthContext.Provider
        value={{
          isadmin: isadmin,
          isRegistered: isRegistered,
          setIsRegistered: setIsRegistered,
          username: username,
          handleSignupSuccess: handleSignupSuccess,
          afterlogout: afterlogout,
          uid: uid,
        
        }}
      >
        <BrowserRouter>
          <ChakraProvider theme={customTheme}>
            <div className='b'>
              <Sidebar />
              <Header />
            </div>
            <Routes>
              
              <Route path='/' element={<Landing />} />
      
              <Route path="/login" element={<LoginPage handleSignupSuccess={handleSignupSuccess} />} />
              <Route path="/signup" element={<SignUpPage handleSignupSuccess={handleSignupSuccess} />} />



            {/*Bus Management*/}
              <Route path='/busManagement' element={<BusAdmin/>} />
              <Route path='/bus' element={<Bus />} />


       


             {/*Grevance Management*/}
              <Route path='/complaint/:username' element={<GrievanceStudent />} />
              <Route path='/create-ticket/:username' element={<GrievanceNewTicket />} />

              <Route path='/complaintAdmin' element={<GrevanceStudentAdmin />} />


              <Route path='/store' element={<Marketplace />} />
    
    
                   </Routes>
          </ChakraProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
