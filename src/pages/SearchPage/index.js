import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import axios from "axios";
import Card from "../../component/Card";
import { Grid, GridItem, Heading, Spinner } from "@chakra-ui/react";
import { SearchService } from "../../service/Search/SearchService";
export default function SearchPage(props) {
  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (!location.state) return;
    getScreenData();
  }, [location.state]);

  const getScreenData = () => {
    SearchService.getData({ search: location.state })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Heading color="brand.600"> Từ khóa: {location.state}</Heading>
      <Grid templateColumns="repeat(4, 1fr)" columnGap={"8px"} p={"8px"}>
        {data?.map((item) => {
          return (
            <GridItem
              key={item._id}
              // colSpan={{ lg: 1, md: 2, sm: 4, xs: 4 }}
              colSpan={[4, 3, 2, 1]}
              pt="5"
            >
              <Card data={item} />
            </GridItem>
          );
        }) || (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Grid>
    </>
  );
}
