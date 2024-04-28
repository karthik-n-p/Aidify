import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Box, Heading, Text, VStack, HStack, Divider,Image, FormControl, FormLabel, Input ,Button} from '@chakra-ui/react';
import signinImage from '../../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://localhost:5000/auth';
        // const URL = 'https://medical-pager.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <Box className="auth__form-container"  ml={130}>
            <Box className="auth__form-container_fields">
                <Box className="auth__form-container_fields-content">
                    <Text>{isSignup ? 'Sign Up' : 'Sign In'}</Text>
                  
                    <FormControl onSubmit={handleSubmit}>
                        {isSignup && (
                            <Box className="auth__form-container_fields-content_input">
                               <FormLabel htmlFor="fullName">Full Name</FormLabel>
                                <Input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                        )}
                        <Box className="auth__form-container_fields-content_input">
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <Input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                        />
                        </Box>
                        {isSignup && (
                            <Box className="auth__form-container_fields-content_input">
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <Input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                        )}
                        {isSignup && (
                            <Box className="auth__form-container_fields-content_input">
                                <FormLabel htmlFor="avatarURL">Avatar URL</FormLabel>
                                <Input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                        )}
                        <Box className="auth__form-container_fields-content_input">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                        </Box>
                        {isSignup && (
                            <Box className="auth__form-container_fields-content_input">
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <Input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                            />
                            </Box>
                            )}
                        <Box className="auth__form-container_fields-content_button">
                            <Button>{isSignup ? "Sign Up" : "Sign In"}</Button>
                        </Box>
                    </FormControl>
                    <Box className="auth__form-container_fields-account">
                        <Text>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </Text>
                    </Box>
                </Box> 
            </Box>
            <Box className="auth__form-container_image">
                <Image src={signinImage} alt="sign in" />
            </Box>
        </Box>
    )
}

export default Auth