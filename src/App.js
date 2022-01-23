import { Container, Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import { AllRoute } from "./contants/Route";
// import MenuHeader from "./component/Header";
import Sidebar from "./component/Sidebar";

const RouteExport = () => {
  const route = useRoutes(AllRoute);
  return route;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Grid
          h="100vh"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(6, 1fr)"
        >
          <GridItem rowSpan={2} colSpan={1} bg="brand.200">
            <Sidebar />
          </GridItem>
          <GridItem colSpan={5} bg="papayawhip" h={'80vh'}>
            <RouteExport />
          </GridItem>
          <GridItem colSpan={5} bg="tomato">Footer</GridItem>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
