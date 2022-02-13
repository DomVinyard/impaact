import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";

const IndexPageComponent = () => {
  const [session] = useSession();
  const heightOfNavbar: string = "74px";
  const containerPadding: string = "1rem";

  return (
    <Stack>
      <Flex>
        left
        <Canvas
          style={{ height: "100vh", width: "100%" }}
          colorManagement
          camera={{ position: [0, 0, 5] }}
        >
          <Lights />
          <Model />
        </Canvas>
      </Flex>
    </Stack>
  );
};

export default IndexPageComponent;
