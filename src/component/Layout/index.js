import { Container, Grid, GridItem } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import { AllRoute } from "../../contants/Route";
import Sidebar from "../Sidebar";
import AudioPlayTrack from "./../AudioPlayTrack";
import Header from "../Header";
import UserContext from "../../helpers/ContextProvider";
import { useContext, useEffect, useRef, useState } from "react";

const RouteExport = () => {
  const { auth } = useContext(UserContext); // user đã đăng nhập chưa ? đăng nhập -> true, chưa đăng nhập -> false
  const route = useRoutes(AllRoute(auth));
  return route;
};

export default function LayoutRoute() {
  const [height, setHeight] = useState();
  const gridRef = useRef();
  useEffect(() => {
    setHeight(window.innerHeight);
    let resize = () =>
      window?.addEventListener("resize", (e) => {
        setHeight(window.innerHeight);
      });
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <Grid
      h="100vh"
      templateRows="60px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      templateColumns={[
        "52px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        "52px 1fr 1fr 1fr 1fr 1fr",
        "52px 1fr 1fr 1fr 1fr 1fr",
        "200px 1fr 1fr 1fr 1fr 1fr",
      ]}
      columnGap={"8px"}
      p={"8px"}
      overflow={"hidden"}
      style={{
        height: height,
      }}
      ref={gridRef}
    >
      <GridItem
        rowSpan={10}
        colSpan={1}
        bg="brand.25"
        borderRadius={8}
        style={{
          boxShadow: "var(--main-box-shadow-hover)",
          display: "block",
        }}
      >
        <Sidebar />
      </GridItem>

      <GridItem colSpan={[7, 5, 5]} rowSpan={1} bg="transparent">
        <Header />
      </GridItem>

      <GridItem
        colSpan={[7, 5, 5]}
        rowSpan={8}
        bg="brand.25"
        overflowY={"scroll"}
        className="custom_scroll"
        style={{ boxShadow: "var(--main-box-shadow-hover)" }}
      >
        <Container maxW="container.lg" p="2">
          <RouteExport />
        </Container>
      </GridItem>

      <GridItem
        colSpan={[7, 5, 5]}
        rowSpan={1}
        zIndex={1}
        height={"100%"}
        borderRadius={"0 0 8px 8px"}
      >
        <AudioPlayTrack />
      </GridItem>
    </Grid>
  );
}
