import { Container, Grid, GridItem, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import { AllRoute } from "./contants/Route";
// import MenuHeader from "./component/Header";
import Sidebar from "./component/Sidebar";
import AudioPlayTrack from "./component/AudioPlayTrack";
import "./assets/css/styles.scss";
import Header from "./component/Header";
import { UserProvider } from "./helpers/ContextProvider";
import { useState } from "react";
const RouteExport = () => {
  const route = useRoutes(AllRoute);
  return route;
};

function App() {
  const [playlist, setPlayList] = useState([]);
  return (
    <div className="App" style={{ background: "var(--core-0)" }}>
      <UserProvider
        value={{
          playlist,
          setList: (data) => setPlayList(data),
        }}
      >
        <Router>
          <Grid
            h="100vh"
            templateRows="60px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
            templateColumns={[
              "60px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              "repeat(6, 1fr)",
              "repeat(6, 1fr)",
            ]}
            columnGap={"8px"}
            p={"8px"}
            overflow={"hidden"}
          >
            <GridItem
              rowSpan={10}
              colSpan={1}
              bg="brand.25"
              borderRadius={8}
              style={{ boxShadow: "var(--main-box-shadow-hover)" }}
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
              <Container maxW="container.lg" p="5">
                <RouteExport />
              </Container>
            </GridItem>
            <GridItem colSpan={[7, 5, 5]} rowSpan={1} zIndex={1}>
              <AudioPlayTrack />
            </GridItem>
          </Grid>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
