// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Box, ButtonGroup, Container, Icon, IconButton, Link, Stack, VStack} from '@chakra-ui/react'
import { Text,Button,Image,Flex,Card,CardHeader,CardBody,CardFooter,HStack,Heading,SimpleGrid,GridItem } from '@chakra-ui/react'
import  LandingPic from '../../assets/human-heart.png'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import Logo from '../../assets/logo.png'


export default function LandingContent() {


  const Feature = (props) => {
    return (
      <Flex     >
        <Flex shrink={0}>
          <Icon
            boxSize={5}
            mt={1}
            mr={2}
            color="brand.500"
            _dark={{
              color: "brand.300",
            }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              color='#0067FF'
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </Icon>
        </Flex>
        <Box ml={4}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            lineHeight="6"
            _light={{
              color: "gray.900",
            }}
          >
            {props.title}
          </Text>
          <Text
            mt={2}
            color="gray.500"
            _dark={{
              color: "gray.400",
            }}
          >
            {props.children}
          </Text >
        </Box>
      </Flex>
    );
  };

  

    return (
      <Box bg="#ECECEC"  h={'100%'} w={'100%'}>
    <VStack pos={'relative'} pl={{md:"60px" ,base:"10px"}} bg={'#ECECEC'}  h="75vh" w={'100%'}  gap={'50px'} >
    
      <VStack pt={'50px'} w={'100%'}  display={'flex'} alignItems={'flex-start'}  >
          <Flex flexDirection={{md:"row",base:"column"}}  gap={{base:'0px',md:"100px"}}>
          <Text color="#252525"  lineHeight={{md:"160px", base:"36px"}}  alignSelf={'flex-start'}    fontSize={{md:"124px", base:"56px"}} fontWeight={'600'} >Personalized</Text>
          <Button display={{ base:"none", md:"block"}}  alignSelf={'center'} mb={'-20px'} fontSize={'24px'} h="60px" w={'200px'}    bg="btng"  color="white" >Get Started</Button>
          </Flex>
        <Text fontWeight={'600'} lineHeight={{md:"100px", base:"56px"}} color="#252525" alignSelf={'start'}  fontSize={{md:"124px", base:"56px"}}  >Healthcare System</Text>
      </VStack>

      <HStack  h={'100%'}  w="90vw" display={'flex'} pl={{md:'70px', base:'10px'}} gap={{md:'300px', base:'5px'}}   >
        <Text alignSelf={'flex-start'} fontSize={{md:"24px", base:"12px"}} fontWeight="thi" color="black" > Lorem ipsum dolor, sit amet   consectetur <br /> adipisicing elit. Eum ipsa doloribus <br /> nisi quo libero, quia isi dsfh </Text>
        <Image zIndex={'100'}   position={'absolute'} right={{md:'5%',base:'0%'}}  bottom={{md:'-250px',base:'0%'}}    src={LandingPic} alt="LandingPic" w={{md:'500px',base:"260px"}} h={{md:'500px',base:"280px"}} />
        <Box position="relative" alignSelf="flex-end" w="350px" h="150px">
  {/* Outer semi-circle */}
 
  {/* Inner semi-circle */}
  <Box
    position="absolute"
    bottom="0"
    left="0px" /* Adjust the left position as needed */
    right="0px" /* Adjust the right position as needed */
    h="180.5px" /* Half of the parent's height */
    bg="#F3F3F3"
    borderRadius="280px 280px 0 0"
    border="2px solid white"
  />


<Box
    position="absolute"
    bottom="0"
    left="30px"
    right="30px"
    h="150px" /* Half of the parent's height */
    bg="#F8F8F8"
    borderRadius="250px 250px 0 0"
  
    border="3px solid white"
  
  />
</Box>


       
      </HStack>
     



     
    </VStack>

    <HStack  zIndex={'1'} pos={'relative'} my="10px"   w="100%" height={'120px'} bg="btng" color="white" overflow="hidden"  >
  <HStack animation="marquee 10s linear infinite" gap={'50px'} >
  <Text fontSize="64px" fontWeight="bold" > Ai  </Text>
  <Text fontSize="64px" color={'white'} fontWeight="100" >&nbsp;+&nbsp;</Text>
    <Text fontSize="64px" fontWeight="bold" >BlockChain</Text>
    <Text fontSize="64px" color={'white'} fontWeight="100" >&nbsp;+&nbsp;</Text>
    <Text fontSize="64px" fontWeight="bold" >Telemedicine</Text>
    <Text fontSize="64px" color={'white'} fontWeight="100">&nbsp;+&nbsp;</Text>
    <Text fontSize="64px" fontWeight="bold" >A</Text>

   
  </HStack>
  <HStack animation="marquee 10s linear infinite" gap={'50px'} >
    <Text fontSize="64px" fontWeight="bold" >i</Text>
    <Text fontSize="64px" color={'white'} fontWeight="thin" >+</Text>
    <Text fontSize="64px" fontWeight="bold" >BlockChain</Text>
    <Text fontSize="64px" color={'white'} fontWeight="thin" >+</Text>
    <Text fontSize="64px" fontWeight="bold" >Telemedicine</Text>
    <Text fontSize="64px" color={'white'} fontWeight="thin" >+</Text>
    <Text fontSize="64px" fontWeight="bold" >IOT</Text>
    <Text fontSize="64px" color={'white'} fontWeight="thin" >&nbsp;  +  &nbsp;</Text>
   
  </HStack>
</HStack>

<style>
        {`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}
      </style>




   





    <Flex
          
      _dark={{
        bg:"#F9F9F9",
      }}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        shadow="xl"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        px={{md:"8",base:"3"}}
        py={{md:"20",base:"10"}}
        mx="auto"
      >
        <SimpleGrid
          alignItems="center"
          columns={{
            base: 1,
            lg: 3,
          }}
          spacingY={{
            base: 10,
            lg: 32,
          }}
          spacingX={{
            base: 10,
            lg: 24,
          }}
        >
          <Box alignSelf="start">
           
            <Text h2
              mb={3}
              fontSize={{
                base: "3xl",
                md: "4xl",
              }}
              fontWeight="extrabold"
              textAlign={{
                
                sm: "left",
              }}
              _light={{
                color: "black",
              }}
              lineHeight="shorter"
              letterSpacing="tight"
            >
              All-in-one platform
            </Text>
            <Text
              mb={6}
              fontSize={{
                base: "lg",
                md: "xl",
              }}
             
              color="gray.600"
              _dark={{
                color: "gray.500",
              }}
            >
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </Text>
          </Box>
          <GridItem colSpan={2}>
            <Stack
              spacing={{
                base: 10,
                md: 0,
              }}
              display={{
                md: "grid",
              }}
              gridTemplateColumns={{
                md: "repeat(2,1fr)",
              }}
              gridColumnGap={{
                md: 10,
                
              }}
              gridRowGap={{
                md: 10,
              }}
            >
              <Feature title="Upload Medical Records">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, soluta..{" "}
              </Feature>
              <Feature title="Find your doctor">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, reiciendis?
              </Feature>
              <Feature title="See realtime health status">
                {" "}
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, laboriosam.
              </Feature>
              <Feature title="Manage your clinic/hospital online">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, exercitationem.
                {" "}
              </Feature>
              <Feature title="Enjoy blockchain security">
                {" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, eligendi?
              </Feature>
              <Feature title="Interact online with you Doctor">
                {" "}
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, dolore.{" "}
              </Feature>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>



  




      <Box
    as="footer"
    role="contentinfo"
    py={{
      base: '12',
      md: '16',
    }}
    px={{
      base: '12',
      md: '36',
    }}
    w={'100%'} 
    bg={'#ECECEC'} 
    borderRadius={'30px'}
    

  >
    <Stack
      spacing={{
        base: '4',
        md: '5',
      }}
    >
      <Stack  justify="space-between" direction="row" align="center">
        <Image src={Logo} alt="Logo" w="60px" h="60px" />
        <ButtonGroup variant="tertiary">
          <IconButton  as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin size={'30px'} />} />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub size={'30px'}/>} />
          <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter  size={'30px'}/>} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="fg.subtle">
        &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights reserved.
      </Text>
    </Stack>
  </Box   >




  
  

    
  </Box>

    )

}