import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";

const IndexPageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [keyPresses, setKeyPresses] = React.useState([]);

  return (
    <Stack style={{ background: "#040d21" }}>
      <Box width="100%" position={"absolute"} zIndex={1}>
        <Box
          p={3}
          mx={2}
          pt={{ base: 12, md: 12, lg: 20 }}
          maxWidth={1200}
          m="0 auto"
          color={"#fff"}
          fontSize={{ base: "36px", md: "42px", lg: "60px" }}
          fontFamily={"Montserrat"}
          fontWeight={800}
        >
          <Stack lineHeight={"1"}>
            <Box>The home of</Box>
            <Box>positive change</Box>
            <Box pt={5}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  top={1}
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  size="lg"
                  placeholder="Search organisations"
                  autoFocus
                  maxWidth={400}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.key !== "Backspace") {
                      setKeyPresses([new Date(), ...keyPresses].slice(0, 10));
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const cachedQuery = query;
                      setQuery("");
                      location.assign("/search?q=" + cachedQuery);
                    }
                  }}
                />
              </InputGroup>
            </Box>
          </Stack>
        </Box>
      </Box>
      <img
        src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
        alt="Glowing universe"
        style={{ position: "absolute" }}
      ></img>
      <Flex display={{ base: "none", md: "block" }}>
        <Canvas
          style={{ height: "80vh", width: "100%" }}
          colorManagement
          camera={{ position: [0, 0, 5] }}
        >
          <Lights />
          <Model />
        </Canvas>
      </Flex>
      <Flex display={{ base: "block", md: "none" }}>
        <Canvas
          style={{ height: "80vh", width: "100%" }}
          colorManagement
          camera={{ position: [0, 1, 5] }}
        >
          <Lights />
          <Model keyPresses={keyPresses} />
        </Canvas>
      </Flex>
    </Stack>
  );
};

export default IndexPageComponent;
