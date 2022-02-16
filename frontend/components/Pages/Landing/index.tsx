import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import OrgsList from "components/OrgList";
import { useFetchOrgsQuery } from "generated-graphql";
import React from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";
import SearchBar from "components/SearchBar";

const IndexPageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [isSearchFocusMobile, setIsSearchFocusMobile] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [latestKeypress, setLatestKeypress] = React.useState<
    Date | undefined
  >();
  const { data, error, loading } = useFetchOrgsQuery();

  return (
    <>
      <Stack
        style={{
          background: "#040d21",
          marginTop: isSearchFocusMobile ? -235 : 0,
        }}
      >
        {isSearchFocusMobile && (
          <Box
            width="100vw"
            position={"fixed"}
            left={0}
            top={0}
            zIndex={1}
            background={"#040d21"}
            height={"100vh"}
          ></Box>
        )}
        <Box width="100%" position={"absolute"} zIndex={1}>
          <Box
            p={3}
            mx={2}
            pt={{ base: "65px", md: 20 }}
            textAlign={{ base: "center", md: "left" }}
            maxWidth={1200}
            m="0 auto"
            color={"#fff"}
            fontSize={{ base: "38px", md: "42px", lg: "60px" }}
            fontFamily={"Montserrat"}
            fontWeight={700}
          >
            <Stack lineHeight={"1"}>
              <Box>Measuring</Box>
              <Box>positive impact</Box>
              <Flex pt={5}>
                {isSearchFocusMobile && (
                  <Button
                    size={"lg"}
                    background={"none"}
                    colorScheme={"blue"}
                    onClick={() => {
                      setQuery("");
                      setIsSearchFocusMobile(false);
                    }}
                  >
                    <ArrowBackIcon color="gray.300" />
                  </Button>
                )}
                <SearchBar
                  isSearchFocusMobile={isSearchFocusMobile}
                  mini={false}
                  value={query}
                  onFocus={() => isMobile && setIsSearchFocusMobile(true)}
                  onChange={(value) => {
                    const pressAt = new Date();
                    const newQuery = value;
                    newQuery.length > query.length &&
                      setLatestKeypress(new Date());
                    setQuery(value);
                  }}
                  onSubmit={() => {
                    const cachedQuery = query;
                    setQuery("");
                    location.assign("/search?q=" + cachedQuery);
                  }}
                />
              </Flex>
            </Stack>
          </Box>
        </Box>
        <img
          src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
          alt="Glowing universe"
          style={{ position: "absolute", pointerEvents: "none" }}
        ></img>
        <>
          <Flex display={{ base: "none", md: "block" }}>
            <Canvas
              style={{ minHeight: "600px", height: "80vh", width: "100%" }}
              colorManagement
              camera={{ position: [-1, -0.25, 4.5] }}
            >
              <Lights />
              <Model latestKeypress={latestKeypress} baseSpeed={0.001} />
            </Canvas>
          </Flex>
          <Flex display={{ base: "block", md: "none" }}>
            <Canvas
              style={{ minHeight: "600px", height: "80vh", width: "100%" }}
              colorManagement
              camera={{ position: [0, 1.75, 5] }}
            >
              <Lights />
              <Model latestKeypress={latestKeypress} baseSpeed={0.002} />
            </Canvas>
          </Flex>
        </>
      </Stack>
      <Box mb={{ base: 20, md: 40 }} textAlign={{ base: "center", md: "left" }}>
        <Content>
          <Box>
            <Heading
              mt={{ base: 10, md: 40 }}
              size={"xl"}
              color={"#64a3cb"}
              mb={6}
            >
              FEATURED
            </Heading>
            {<OrgsList orgs={data?.orgs} />}
          </Box>
          <Box>
            <Heading
              mt={{ base: 20, md: 20 }}
              size={"xl"}
              color={"#64a3cb"}
              mb={6}
            >
              BROWSE GOALS
            </Heading>
            <Box background={"#eee"} height={400}></Box>
          </Box>
          <Box>
            <Heading
              mt={{ base: 20, md: 20 }}
              size={"xl"}
              color={"#64a3cb"}
              mb={6}
            >
              ABOUT PPS
            </Heading>
            <Box background={"#eee"} height={800}></Box>
          </Box>
        </Content>
      </Box>
    </>
  );
};

export default IndexPageComponent;
