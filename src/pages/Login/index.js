import React, { useContext, useState, useEffect } from "react";
import axios from "../../config/axios";
import {
  Box,
  Badge,
  FormLabel,
  Input,
  FormControl,
  InputGroup,
  Button,
  InputRightElement,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import UserContext from "../../helpers/ContextProvider";
import { useNavigate } from "react-router";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { auth, setAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (auth) return navigate(-1 || "/");
  }, [auth]);

  const Login = () => {
    if (info.username === "") return;
    if (info.password === "" || info.password.length < 6) return;

    const formData = new FormData();
    formData.append("username", info.username);
    formData.append("password", info.password);
    setLoading(true);
    axios
      .post("/api/login", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAuth(res.data.authenticate);
          let { data } = res.data;
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="50px auto"
      boxShadow={"0 15px 35px -20px #ccc"}
      bg={"core.50"}
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
        <Grid templateRows={"1fr 20px 1fr"} gap={"12px"}>
          <GridItem>
            <FormControl colorScheme={"core.500"}>
              <Input
                id="email"
                type="email"
                variant="flushed"
                placeholder="Enter Email"
                onChange={(e) => setInfo({ ...info, username: e.target.value })}
              />
            </FormControl>
          </GridItem>
          <Spacer />
          <GridItem>
            <FormControl>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  variant="flushed"
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        <Box
          display="flex"
          mt="2"
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <Button onClick={Login} isLoading={loading}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
