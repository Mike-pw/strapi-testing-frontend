import { chakra, Box } from "@chakra-ui/react";

const Ma = ({user, message, currentUser}) => {
  return (
        <Box bg="gray.50"
            w="100%"
            my={2}
            py={2}
            px={4}
            rounded="lg"
>
          <Box mx={3}>
            <chakra.span
              color={(currentUser==user)? "green.500" : "red.500"}
              fontWeight="bold"
            >
              {user}
            </chakra.span>
            <chakra.p
              color="gray.700"
              fontSize="sm"
            >
              {message}
            </chakra.p>
          </Box>
        </Box>
  );
};

export default Ma;