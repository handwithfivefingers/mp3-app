import React, { useEffect, useState } from "react";
import useAuth from "../../helpers/Common";
import {
  Container,
  Wrap,
  WrapItem,
  Avatar,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import styles from "./styles.module.scss";
import { Outlet, useNavigate } from "react-router";
const Dashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!search) return;
    const timeout = setTimeout(() => {
      console.log(search);
      navigate("/search", { state: search });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Container maxW="container.xl">
      <div className={styles.header}>
        <div className={styles.left}>
          <ArrowBackIcon onClick={() => navigate(-1)} />
          <ArrowForwardIcon onClick={() => navigate(1)} />
        </div>
        <div className={styles.middle}>
          <InputGroup bg={"brand.100"} borderRadius={15} width={"100%"}>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Tìm kiếm bài nhạc"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className={styles.right}>
          <Wrap>
            <WrapItem>
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                onClick={() => navigate("/login")}
              />
            </WrapItem>
          </Wrap>
        </div>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </Container>
  );
};

export default Dashboard;
