import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Outlet, useNavigate } from "react-router";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { SearchService } from "../../service/Search/SearchService";
import Card from "../../component/Card";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = () => {
    setLoading(true);
    let params = {
      search: "",
    };
    SearchService.getData(params)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const renderSkeleton = () => {
    let xhtml = [];
    for (let i = 0; i < 4; i++) {
      xhtml.push(
        <GridItem key={i} colSpan={[12, 6, 4, 3]}>
          <Box padding="6" boxShadow="lg">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </GridItem>
      );
    }
    return xhtml;
  };
  return (
    <>
      <Grid
        templateColumns="repeat(12, 1fr)"
        columnGap={"12px"}
        p={"12px"}
        rowGap={"12px"}
      >
        {loading ? renderSkeleton() : ""}
        {data.map((item) => {
          return (
            <GridItem key={item._id} colSpan={[12, 6, 4, 3]}>
              <Card data={item} />
            </GridItem>
          );
        })}
        <Outlet />
      </Grid>
    </>
  );
};

export default Dashboard;
