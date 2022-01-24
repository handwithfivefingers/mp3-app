import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Badge,
  FormLabel,
  Input,
  FormControl,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="50px auto"
      boxShadow={"0 15px 35px -20px #ccc"}
      bg={"brand.100"}
    >
      <Box
        mt="2"
        ml="2"
        fontWeight="semibold"
        as="h2"
        lineHeight="tight"
        isTruncated
        fontSize={24}
        textAlign={"center"}
      >
        Đăng nhập
      </Box>
      <Box p="6">
        <Box display="flex" alignItems="baseline" flex="1">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            width={"100%"}
          >
            <FormControl>
              <Input
                id="email"
                type="email"
                variant="flushed"
                placeholder="Enter Email"
              />
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  variant="flushed"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        ></Box>

        <Box></Box>

        <Box
          display="flex"
          mt="2"
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <Button>Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
