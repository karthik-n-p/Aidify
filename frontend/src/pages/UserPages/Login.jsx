import React, { useRef } from 'react';
import { Box, Flex, Divider, Text, Input, Button, Heading,Alert,AlertIcon,Select } from '@chakra-ui/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './AuthContext';





const LoginPage = ({ handleSignupSuccess }) => {

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  // showing login failed error after entering wrong credentials
  const [error, setError] = React.useState(null);
  const [resetPasswordMessage, setResetPasswordMessage] = React.useState('');
  const [isadmin, setIsadmin] = React.useState(false);
  const [userType, setUserType] = React.useState('');

  const {isdoctor} = useContext(AuthContext);

const checkAdmin = async (user) => {
   
    const uid=user.uid;
    console.log(uid);
    //post request to backend to check if user is admin or not using axios passing uid as parameter
    axios.post('http://localhost:3000/admin-status', {uid})
    .then((response) => {
      console.log("check admin status",response.data.isAdmin);
      if(response.data){
        setIsadmin(response.data.isAdmin);
        
      }
      if(response.data.isAdmin){
        handleSignupSuccess(user,response.data.isAdmin)
      
          navigate('/clinic')

      }
    
      else{
        console.log("user is patient");
        handleSignupSuccess(user,response.data.isAdmin)
        navigate('/')
      }

    }
    )
    .catch((error) => {
      console.log(error);
    }
    );

    

    
    
 
};


  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const userData = {
        username: email,
        // Add other user data properties as needed
      };
      // Redirect the user to the desired page upon successful login
      checkAdmin(auth.currentUser)
     
      
     
      
    } catch (error) {
      if(error.code === 'auth/user-not-found'){
        setError('User not found with this email address ')
      }
      else if(error.code === 'auth/wrong-password'){
        setError('Wrong password check again')
      }
      console.log('Login failed', error);
    }
  };

  const handleForgotPassword = async () => {
    const email = emailRef.current.value;

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      setResetPasswordMessage('Password reset email sent. Please check your inbox.');
      setError(null);
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Error sending password reset email:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      const userData = {
        username: email.substring(0, email.lastIndexOf('@')),
      
      };
   
    

     
      checkAdmin(user);
    } catch (error) {
      console.log('Google sign-in failed', error);
    }
  };



  return (
    <>
      <Box bg={'bg'} display="flex" flexDirection="column" gap="150px">
        <Box
          w="800px"
          height="100%"
          position="relative"
          top="60px"
          left="400px"
          display="flex"
          flexDirection="row"
        >
          <Flex direction="column">
            <Heading fontStyle="normal" fontWeight="bold" fontSize="5xl" p="40px 65px 35px 0px">
              Log In
            </Heading>
            <Select
              placeholder="Select User Type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              mb={4}
            >
              <option value="clinic">Clinic</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </Select>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}  w="250px" h="45px" border={'3px solid white'} borderRadius="4px" cursor={'pointer'} onClick={handleGoogleSignIn}>
                    <FaGoogle size="25px"  />
                    <Text color="black" fontSize="md" lineHeight={"18px"} bg={''}>
                      Sign Up with Google
                    </Text>

                  </Box>
               
         
            <Text fontSize="md" fontWeight="400" m="25px 0 10px 0">
              How social log in works
            </Text>
            <Text w="300px" h="130px" color="txtg" fontSize="sm">
              If the email address associated with your social account matches the email address of your CodeSpace
              account, you'll be Signed Up. You aren't locked to any particular social account. Questions? contact
              support.
            </Text>
          </Flex>
          <Box mt="100px" ml="55px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
            <Box display="flex" alignItems="center" justifyContent="center" mx="2" w="45px" h="50px" border="1px solid #9B9DAD" borderRadius="10px" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="#9B9DAD">
                OR
              </Text>
            </Box>
            <Divider orientation="vertical" h="140px" borderColor="#9B9DAD" />
          </Box>
          <Flex ml="70px" direction="column" justifyContent="center">
            <Text mt="10px">Email</Text>
            <Input ref={emailRef} placeholder="Email" w="350px" h="45px" bg="#444857" borderRadius="4px" mt="10px" />
            <Text mt="10px">Password</Text>
            <Input ref={passwordRef} placeholder="Password" type="password" w="350px" h="45px" bg="#444857" borderRadius="4px" mt="10px" />
            <Button type="submit" w="350px" h="45px" bg="btng" borderRadius="4px" mt="20px" color="white" onClick={handleLogin}>
              Log In
            </Button>
            {error && <Text mt="10px"color="red">{error}* </Text>}
            {error && (
            <Alert status="error" mt="10px">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {resetPasswordMessage && (
            <Alert status="success" mt="10px">
              <AlertIcon />
              {resetPasswordMessage}
            </Alert>
          )}

            <Text textAlign="center" mt="25px" fontSize="sm" color="#76DAFF" cursor={'pointer'} onClick={handleForgotPassword} >
              Forgot Password?
            </Text>
          </Flex>
        </Box>
        <Link to='/signup'>
        <Text textAlign="center" ml="250px" mt="55px" fontSize="sm" color="#76DAFF">
          
          Don't have an account? <Text as="u" color="#76DAFF">Sign Up</Text>
        </Text>
        </Link>
      </Box>
    </>
  );
}

export default LoginPage;
