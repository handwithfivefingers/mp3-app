import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import axios from "axios";
import Card from "../../component/Card";
import { Grid, GridItem, Heading, Spinner, Box,
  SkeletonCircle,
  SkeletonText } from "@chakra-ui/react";
import { SearchService } from "../../service/Search/SearchService";
export default function SearchPage(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setData([])
    if (!location.state) return;
    getScreenData();
  }, [location.state]);

  const getScreenData = () => {
    setLoading(true);
    SearchService.getData({ search: location.state })
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
      <Heading color="brand.600"> Từ khóa: {location.state}</Heading>
      <Grid
        templateColumns="repeat(12, 1fr)"
        columnGap={"12px"}
        p={"12px"}
        rowGap={"12px"}
      >
        {loading ? renderSkeleton() : ''}
        {data?.map((item) => {
          return (
            <GridItem key={item._id} colSpan={[12, 6, 4, 3]}>
              {/* <GridItem
              key={item._id}
              // colSpan={{ lg: 1, md: 2, sm: 4, xs: 4 }}
              colSpan={[4, 3, 2, 1]}
              pt="5"
            > */}
              <Card data={item} />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}
