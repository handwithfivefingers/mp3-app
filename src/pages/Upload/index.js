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
  Spinner,
} from "@chakra-ui/react";
import { UploadService } from "../../service/Upload/UploadService";
import { MusicHub } from "../../contants/Tag";
import styles from "./styles.module.scss";
export default function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    UploadService.uploadCloud({
      name: e.target[0].value,
    })
      .then(async (res) => {
        const sign = res.data;
        const formData = new FormData();
        formData.append("file", files);
        formData.append("name", e.target[0].value);
        formData.append("api_key", sign.apikey);
        formData.append("timestamp", sign.timestamp);
        formData.append("signature", sign.signature);
        formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
        formData.append("folder", "song_files");
        fetch(`https://api.cloudinary.com/v1_1/${sign.cloudname}/auto/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            return JSON.parse(data);
          })
          .then(async (res) => {
            let name = e.target[0].value;
            let url = res.secure_url;
            let duration = res.duration;
            console.log(res);
            await handleSaveMusic(name, url, duration);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => console.log(err))
      .finally();
  };

  const handleUploadFiles = (e) => {
    setFiles(e.target.files[0]); // single files
  };
  const handleSaveMusic = (name, url, duration) => {
    console.log("come here");
    UploadService.createSong({
      name,
      url,
      duration,
      tag: tag,
    }).then((res) => {
      console.log(res);
      alert("Upload Done...");
    });
  };
  const handleClick = (item) => {
    if (tag.includes(item.value)) {
      let newTag = tag.filter((val) => val !== item.value);
      setTag(newTag);
    } else {
      setTag([...tag, item.value]);
    }
  };
  return (
    <div>
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
          Upload files
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
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    variant="flushed"
                    placeholder="Enter Email"
                  />
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type="file"
                      placeholder="Enter password"
                      variant="flushed"
                      onChange={(e) => handleUploadFiles(e)}
                    />
                  </InputGroup>
                </FormControl>

                <Box
                  display="flex"
                  mt="2"
                  alignItems="center"
                  justifyContent={"flex-end"}
                >
                  <Button type="submit" isLoading={loading}>
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
      <div className={styles.select}>
        {MusicHub.map((item) => (
          <div className={styles.selectItem} onClick={() => handleClick(item)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
