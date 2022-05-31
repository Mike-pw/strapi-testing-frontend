import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Message from "/components/Message";
import Input from "/components/Input";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { animateScroll } from "react-scroll";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (user === undefined) {
      router.push("/login")
    }
    setUser(Cookies.get("user"))
    setToken(Cookies.get("jwt"))
    const id = setInterval(() => {
      const fetchMessages = async () => {
        const res = await fetch('https://mm-strapi-testing.herokuapp.com/api/messages')
        const data = await res.json()
        setMessages(data.data);
        if (messages.length > count){
        setCount(messages.length)
        }
      };
      fetchMessages();
    }, 500);
      return () => clearInterval(id);
  });

  useEffect(() => {
    scrollToBottom()
    }, [count]);

  function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "messages",
      duration:"300",
    });
}

function logout() {
  Cookies.remove('user');
  router.push("/login");
}

  return (
    <Flex
    w="full"
    h="100vh"
    p={2}
    bg="gray.600"
    alignItems="center"
    justifyContent="center"
    direction="column"
    >
    {user && <Text color="gray.50">Logged in as {user}</Text>}
    <Flex
      p={5}
      w="360px"
      bg="gray.200"
      rounded="lg"
      h="80vh"
      >
      <Box
        mx="auto"
        overflowY="auto"
        id="messages"
        w="100%"
        >
        {messages && messages.map((message, index) => (
          <Message key={index} user={message.attributes.user} message={message.attributes.message} currentUser={user} />
        ))}
      </Box>
    </Flex>
    <Box
      w="360px"
      >
      <Input user={user} token={token} />
      </Box>
      <Button onClick={logout}>Log Out</Button>
  </Flex>
  );

}