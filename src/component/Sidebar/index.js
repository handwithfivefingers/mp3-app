import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { BiListPlus } from "react-icons/bi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useLocation } from "react-router";
import { AllRoute } from "../../contants/Route";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [current, setCurrent] = useState("/");
  const location = useLocation();
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={clsx([styles.header])}>
      <Menu>
        {AllRoute.map((item) => {
          return (
            <Link key={item.path} to={item.path}>
              <MenuItem
                as={Box}
                value={item.path}
                color={"brand.600"}
                bg={"brand.25"}
                p={3}
              >
                <span style={{ width: "36px" }}> {item?.icon}</span>{" "}
                <span className={styles.hide}> {item.title}</span>
              </MenuItem>
            </Link>
          );
        })}
        <MenuItem
          color={"brand.600"}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
          }}
          as={Box}
        >
          <span style={{ width: "36px" }}>
            <BiListPlus
              style={{ color: "var(--main-600)", fontSize: "24px" }}
            />
          </span>
          <span className={styles.hide}> Add new Playlist </span>
        </MenuItem>
      </Menu>
    </div>
  );
}
