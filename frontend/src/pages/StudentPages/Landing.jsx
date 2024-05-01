// This is the landing page for the app where user can login or signup
import React, { useContext } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react'
import Sidebar from '../../components/landing-page/Navbar'
import Header from '../../components/landing-page/header'
import Landingcards from '../../components/landing-page/Landingcards'

import AuthContext from './AuthContext'

export default function Landing() {
  const { isRegistered } = React.useContext(AuthContext);
  const {isadmin} = useContext(AuthContext);
  console.log("Inside landing.jsx isRegistered: ",isRegistered)
  console.log(import.meta.env.VITE_SOME_KEY) 
  return (
    <Box bg={'bg'} alignItems={'center'} justifyContent={'center '}      >

          {<Landingcards/>}

     

    </Box>
  )
}
