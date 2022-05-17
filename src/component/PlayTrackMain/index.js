import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
export default function PlayTrackMain({ data }) {
  const handleClick = () => {
    console.log("handleClick");
  };
  return (
    <Grid
      h="100vh"
      templateRows="repeat(6, 1fr)"
      templateColumns="repeat(6, 1fr)"
      columnGap={"8px"}
      p={"8px"}
    >
      <GridItem rowSpan={6} colSpan={2} bg="brand.200" borderRadius={8}>
        <Heading fontSize="xl" color="brand.600">
          Now Playing ....
        </Heading>
      </GridItem>

      <GridItem
        rowSpan={6}
        colSpan={4}
        // bg="brand.200"
        borderRadius={8}
      >
        <Table variant="simple" colorScheme="orange">
          <TableCaption placement="top">Album : xxxxxx</TableCaption>
          <Thead>
            <Tr>
              <Th>Bài hát</Th>
              <Th>Album</Th>
              <Th isNumeric>Thời gian</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr onClick={handleClick}>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            {data?.map((item) => {
              return (
                <Tr key={item._id} onClick={() => handleClick(item)}>
                  <Td>{item.name}</Td>
                  <Td>{item?.album}</Td>
                  <Td isNumeric>{item?.time}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
}
