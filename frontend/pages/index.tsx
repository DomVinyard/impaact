import React from "react";
import { Canvas } from "react-three-fiber";
import Lights from "../3d/Light";
import Model from "../3d/Model";

const App = () => {
  return (
    <>
      <Canvas colorManagement camera={{ position: [0, 0, 5] }}>
        <Lights />
        <Model />
      </Canvas>
    </>
  );
};

export default App;
