import React, { useState, useEffect, useContext } from "react";
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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Lorem,
} from "@chakra-ui/react";
import { BiListPlus, BiMinus } from "react-icons/bi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useLocation } from "react-router";
import { AllRoute } from "../../contants/Route";
import { Link } from "react-router-dom";
import CustomModal from "../CustomModal";
import UserContext from "../../helpers/ContextProvider";

export default function Sidebar() {
  const [current, setCurrent] = useState("/");
  const [showModal, setShowModal] = useState({
    show: false,
    component: null,
  });
  const { playlist, setList, auth } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);
  const openModal = () => {
    setShowModal({
      ...showModal,
      show: true,
    });
  };
  const onClose = () => {
    setShowModal({
      ...showModal,
      show: false,
    });
  };

  const handleDeleteSong = (song) => {
    if (playlist.length > 0) {
      let data = playlist.filter((item) => item._id !== song._id);
      setList(data);
    } else {
      setList([]);
    }
  };
  console.log(current);
  return (
    <div className={clsx([styles.header])}>
      <Menu>
        <div className={styles.menuTop}>
          {AllRoute(auth).map((item) => {
            if (item.path === "/login") {
              if (auth) return;
            }
            if (item.path === "/upload") {
              if (!auth) return;
            }
            return (
              <Link key={item.path} to={item.path}>
                <MenuItem
                  as={Box}
                  value={item.path}
                  color={"brand.600"}
                  bg={"brand.25"}
                  p={3}
                  className={clsx([
                    styles.menuItem,
                    {
                      [styles.active]: current === item.path,
                    },
                  ])}
                  // // onClick={ setCurrent()}
                >
                  <span style={{ width: "36px" }}> {item?.icon}</span>{" "}
                  <span className={styles.hide}> {item.title}</span>
                </MenuItem>
              </Link>
            );
          })}
        </div>
        <div className={styles.menuBtm}>
          <MenuItem color={"brand.600"} as={Box} p={3} onClick={openModal}>
            <span style={{ width: "36px" }}>
              <BiListPlus
                style={{ color: "var(--main-600)", fontSize: "24px" }}
              />
            </span>
            <span className={styles.hide}> Your current Playlist </span>
          </MenuItem>

          <MenuItem color={"brand.600"} as={Box} p={3}>
            <span style={{ width: "36px" }}>
              <BiListPlus
                style={{ color: "var(--main-600)", fontSize: "24px" }}
              />
            </span>
            <span className={styles.hide}> Add new Playlist</span>
          </MenuItem>
        </div>
      </Menu>
      <Modal
        blockScrollOnMount={false}
        isOpen={showModal.show}
        onClose={onClose}
        m={2}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Danh sách phát</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul className={styles.listMusic}>
              {playlist?.map((item) => (
                <li key={item._id} className={styles.listItem}>
                  <span>{item.songName?.toUpperCase()}</span>
                  <span className={styles.icon}>
                    <BiMinus onClick={() => handleDeleteSong(item)} />{" "}
                  </span>
                </li>
              ))}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
