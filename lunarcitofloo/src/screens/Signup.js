import React, { useEffect, useState} from 'react'
import './Signup.css'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  chakra,
  Link,
  FormControl,
  InputRightElement
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"

 
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Signup() {
  
  const [user, setUser] = useState({
    email: '',
    name: '',
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);


  const handleChange = (e) => {
    setUser(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
    })
  }

  useEffect(() => {
    // eslint-disable-next-line
  }, [passwordControl])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>         
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
        <Stack
          flexDir="column"
          mb="5"
          justifyContent="center"
          alignItems="center"
        >
        <Heading color="teal.300">Lunarcito Foodie</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            boxShadow="md"
          >
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserAlt color="gray.300" />}   
              />                  
              <Input type="text" name="name" placeholder="name" value={user.name} onChange={handleChange}/>
            </InputGroup>
          </FormControl>
            
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserAlt color="gray.300" />} 
              />
              <Input type="email" name="email" placeholder="email" value={user.email} onChange={handleChange}/>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaLock color="gray.300" />} 
              />
              <Input
                name="password" 
                type={ showPassword? "text" :"password"}
                placeholder= 'Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaLock color="gray.300" />} 
              />
              <Input
                name="passwordControl" 
                type={ showPassword? "text" :"password"}
                placeholder='Confirm password'
                value={passwordControl} 
                onChange={(e) => setPasswordControl(e.target.value)} 
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}> 
                {showPassword? ('hide'):('show')}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
            {errorMessage && <p>{errorMessage}</p>}
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme='gandolapp'
              width="full"
            >
              Sign up
            </Button>
          </Stack>
        </Box>
        </Stack>
        <Box>
          <Link href="/" color="#1CE783" className='login'>Log in</Link>
        </Box>
        </Flex>
      </form>
    </div>    
  )
}
