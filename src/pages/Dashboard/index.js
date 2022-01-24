import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Outlet, useNavigate } from "react-router";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { SearchService } from "../../service/Search/SearchService";
import Card from "../../component/Card";
const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = () => {
    let params = {
      search: "",
    };
    SearchService.getData(params)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" columnGap={"12px"} p={"12px"}>
        {data.map((item) => {
          return (
            <GridItem key={item._id} colSpan={[4, 3, 2, 1]} pt="5">
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
        <Outlet />
      </Grid>
    </>
  );
};

export default Dashboard;
