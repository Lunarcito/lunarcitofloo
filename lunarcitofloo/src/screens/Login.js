import React from "react";
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
   Flex,
   Heading,
   Input,
   Button,
   InputGroup,
   Stack,
   InputLeftElement,
   chakra,
   Box,
   Link,
   FormControl,
   FormHelperText,
   InputRightElement
 } from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "../pages/Login.css"
 
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


export default function Login(props) {
    const { storeToken, storeFleetID, authenticateUser } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    props.funcNav(false)

    const { t } = useTranslation();

    const handleChange = (e) => {
        setUser(prev => {
            return {
            ...prev,
            [e.target.name]: e.target.value
            }
        })
    }

    const logInUser =()=>{
        signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // LogIn 
        const user = userCredential.user;
        storeToken(user.accessToken);
        requestFleetID(user.uid)
        authenticateUser();
        navigate('/')
        props.funcNav(true)
      })
      .catch((error) => {
        setErrorMessage(t('login.invalidpassword'))
      });
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        logInUser() 
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
        mb="30"
        justifyContent="center"
        alignItems="center"
        >
            <Heading className="Lunarcitofloo"/>
            <Box minW={{ base: "80%", md: "468px" }}>
                <Stack
                spacing={4}
                p="3rem"
                boxShadow="md"
                >
                <FormControl>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}                  
                        />
                        <Input type="email" name="email" placeholder={t('login.email')} value={user.name} onChange={handleChange}/>
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
                        type={showPassword? "text" :"password"}
                        placeholder={'login.password'}
                        value={user.password} 
                        onChange={handleChange} 
                        />
                        <InputRightElement width="4.5rem">
                        <Button size="md" onClick={handleShowClick}> 
                        {showPassword? 'login.hide':'login.show'}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                        <Link href='/' color="#1CE783">
                        {'login.forgotpassword'}
                        </Link>
                        {errorMessage && <p className="error-Message">{errorMessage}</p>}
                    </FormHelperText>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme='gandolapp'
                > 
                {t('login.login')}
                </Button>
                <Link textAlign="center" href='/signup' color="#1CE783">
                {'login.signup'}
                </Link>
                </Stack>
            </Box>
        </Stack>
        </Flex>
        </form>
    </div>
   )
}
