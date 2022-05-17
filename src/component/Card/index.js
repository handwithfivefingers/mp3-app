import React, { useContext } from "react";
import { Box, Image, Badge, Heading, Button, Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import UserContext from "../../helpers/ContextProvider";
import { BiCaretRightCircle, BiLeftIndent, BiTimeFive } from "react-icons/bi";
import styles from "./styles.module.scss";
import { MusicHub } from "../../contants/Tag";
const Card = ({ data }) => {
  const { playlist, setList } = useContext(UserContext);
  const handlePlayback = () => {
    // caches.addAll([data]);
    // caches.put(data.url);
    console.log(caches);
    setList([data]);
  };

  const handleAddToList = () => {
    if (playlist.length > 0) {
      let index = -1;
      index = playlist.findIndex((item) => item._id === data._id);
      if (index !== -1) return;
      setList([...playlist, data]);
    } else {
      setList([...playlist, data]);
    }
  };
  const renderTag = () => {
    return data.tag.map((item) => {
      let newTag = MusicHub.filter((val) => val.value === item);
      return newTag.map((v) => {
        return (
          <Box
            color="brand.0"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {v.name}
          </Box>
        );
      });
    });
  };
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      // borderColor={'brand.0'}
      overflow="hidden"
      // cursor={"pointer"}
      className={styles.box}
      bg="core.50"
    >
      <Box
        style={{
          backgroundImage: 'url("https://lyricvn.com/wp-content/uploads/2020/03/61b35411029c6156973232016738c1b7.jpg")',
        }}
        className={styles.img}
        border={0}
      />
      <Box p="3">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          {renderTag()}
        </Box>
        <Box mt="1" lineHeight="tight" isTruncated>
          <Heading color="brand.0" size="md" fontSize={"16px"} textTransform={"capitalize"}>
            {data?.songName}
          </Heading>
        </Box>
        <Box display="flex" alignItems="baseline" mt="2" justifyContent={"space-between"}>
          <Box
            color="brand.0"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="capitalize"
            ml="2"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: "4px",
              alignItems: "center",
            }}
          >
            <BiTimeFive />
            {(([data?.duration] * 1) / 60).toFixed(1) || ""} Min
          </Box>
          <Box
            className={styles.actionIcons}
            display="flex"
            alignItems="flex-end"
            mt="2"
            justifyContent={"space-between"}
          >
            <BiCaretRightCircle onClick={handlePlayback} />
            <BiLeftIndent onClick={handleAddToList} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
