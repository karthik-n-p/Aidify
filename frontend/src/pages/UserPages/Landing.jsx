// This is the landing page for the app where user can login or signup
import React, { useContext } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react'
import Sidebar from '../../components/landing-page/Navbar'
import Header from '../../components/landing-page/header'
import Landingcards from '../../components/landing-page/Landingcards'

import AuthContext from './AuthContext'
import Profile from '../../components/landing-page/Profile'

export default function Landing() {
  const { isRegistered } = React.useContext(AuthContext);
  const {isadmin} = useContext(AuthContext);
  console.log("Inside landing.jsx isRegistered: ",isRegistered)

  return (
    <Box bg={'bg'} >

          {isRegistered ?<Profile/>:<Landingcards/>}

     

    </Box>
  )
}
