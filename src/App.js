import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";

import { Button, Row, Col, AutoComplete } from "antd";
import { useState, useMemo } from "react";
import Lejant from "./Lejant";
import Map from "./Map";
import SelectedShip from "./SelectedShip";

function App() {
  const [port, setPort] = useState(null);
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);

  return (
    <div className="App">
      <Lejant setPort={setPort} port={port} setShips={setShips} />
      <SelectedShip
        selectedShip={selectedShip}
        setSelectedShip={setSelectedShip}
      />
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          port={port}
          ships={ships}
          selectedShip={selectedShip}
          setSelectedShip={setSelectedShip}
        />
      </div>
    </div>
  );
}

export default App;
