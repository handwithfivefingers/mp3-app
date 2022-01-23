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

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const handleUpload = () => {
  //     axios.post("/api/upload/cloud").then((res) => {
  //       const sign = res.data;
  //       const formData = new FormData();
  //       let { file } = formRef.current.getFieldsValue();
  //       let all = file?.fileList?.map((item) => {
  //         formData.append("file", item.originFileObj);
  //         formData.append("api_key", sign.apikey);
  //         formData.append("timestamp", sign.timestamp);
  //         formData.append("signature", sign.signature);
  //         formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
  //         formData.append("folder", "pdf_file");
  //         return fetch(
  //           `https://api.cloudinary.com/v1_1/${sign.cloudname}/auto/upload`,
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         )
  //           .then((response) => {
  //             return response.text();
  //           })
  //           .then((data) => {
  //             return JSON.parse(data);
  //           });
  //       });
  //     });
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/upload/cloud", {
        name: e.target[0].value,
      })
      .then((res) => {
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
            // console.log("resss", res);
            let name = e.target[0].value;
            let url = res.secure_url;
            await handleSaveMusic(name, url);
          });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleUploadFiles = (e) => {
    setFiles(e.target.files[0]); // single files
  };
  const handleSaveMusic = (name, url) => {
    axios
      .post("http://localhost:3001/api/create-song", {
        name,
        url,
      })
      .then((res) => {
        console.log(res);
      });
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
                  isLoading={loading}
                >
                  <Button type="submit">Submit</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
