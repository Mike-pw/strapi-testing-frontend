import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import React, { useState } from 'react'; 
  import Link from 'next/link';
  import { useRouter } from 'next/router';
  import Cookies from 'js-cookie';

  export default function App() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const handleEmail = (event) => setEmail(event.target.value)

    const [password, setPassword] = useState('')
    const handlePassword = (event) => setPassword(event.target.value)

    const handleLogin = () => {

      const data = { 
        identifier: email,
        password: password
      };

      fetch('https://mm-strapi-testing.herokuapp.com/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        Cookies.set("user", data.user.username)
        Cookies.set("jwt", data.jwt)
        router.push("/")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }   

    return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Account Login
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Dont have an account?</Text>
              <Link href="/signup">
              <Button variant="link" colorScheme="green">
                Sign up
              </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input onChange={handleEmail} id="email" type="email" />
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input onChange={handlePassword} id="password" type="password" />
              </FormControl>
            </Stack>
              {/*<Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>*/}
            <Stack spacing="6">
              <Button onClick={handleLogin} bg="gray.100" variant="primary">Login</Button>
              <HStack>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>)
  }