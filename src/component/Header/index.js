import React, { useEffect, useState } from "react";
import {
  Wrap,
  WrapItem,
  Avatar,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!search) return;
    const timeout = setTimeout(() => {
      navigate("/search", { state: search });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <ArrowForwardIcon onClick={() => navigate(1)} />
      </div>
      <div className={styles.middle}>
        <InputGroup bg={"core.500"} borderRadius={99} width={"100%"} border={0} color={'core.50'}>
          <InputLeftElement
            className={styles.icon}
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
            borderRadius={99}
            border={0}
          />
          <Input
            className={styles.input}
            type="text"
            placeholder="Tìm kiếm bài nhạc"
            onChange={(e) => setSearch(e.target.value)}
            borderRadius={99}
            border={0}
            color={"brand.25"}
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
  );
}
