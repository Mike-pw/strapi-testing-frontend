import React from "react";
import {
  chakra,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useState } from 'react'; 

export default function Component({ user, token }) {

  const [message, setMessage] = useState('')
  const handleMessage = (event) => setMessage(event.target.value)

  const handleSend = (event) => {
    event.preventDefault()
    const data = { "data":{ 
      message: message,
      user: user
    }
  }
    fetch('https://mm-strapi-testing.herokuapp.com/api/messages', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
      setMessage('')
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
            <chakra.form
              method="POST"
              rounded="md"
              overflow={{ sm: "hidden" }}
              py={3}
              onSubmit={handleSend}
            >
              <FormControl id="message" mt={1}>
                <Input
                autocomplete="off"
                  placeholder="Write a message."
                  mt={1}
                  rows={3}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{ sm: "sm" }}
                  bg="gray.50"
                  onChange={handleMessage}
                  value={message}
                />
              </FormControl>
            </chakra.form>
  );
}