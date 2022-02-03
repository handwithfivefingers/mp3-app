import "react-h5-audio-player/lib/styles.css";
import "./assets/css/styles.scss";
import { UserProvider } from "./helpers/ContextProvider";
import { useEffect, useState } from "react";
import axios from "./config/axios";
import LayoutRoute from "./component/Layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [playlist, setPlayList] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = () => {
    axios
      .post("/api/auth")
      .then((res) => {
        setAuth(res.data.authenticate);
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  };
  console.log("trigger render");
  return (
    <div className="App" style={{ background: "var(--core-0)" }}>
      <UserProvider
        value={{
          playlist,
          setList: (data) => setPlayList(data),
          auth,
          setAuth: (val) => setAuth(val),
        }}
      >
        <Router>
          <LayoutRoute />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
