import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";

export const SearchBar = ({ value, onChange, onSubmit, mini }) => {
  return (
    <InputGroup
      alignSelf={{ base: "center", md: "left" }}
      maxW={{ base: 400, md: 800 }}
      margin={{ base: "auto", md: 0 }}
    >
      {!mini && (
        <InputLeftElement
          pointerEvents="none"
          top={1}
          children={<SearchIcon color="gray.300" />}
        />
      )}
      <Input
        variant={mini ? "filled" : "outline"}
        size={mini ? "sm" : "lg"}
        marginLeft={mini ? 2 : 0}
        color={"white"}
        backgroundColor={mini ? "#333" : "auto"}
        _hover={{ backgroundColor: mini ? "#555" : "none" }}
        placeholder={mini ? "Search" : "Search charity or organisation"}
        autoFocus={!mini}
        maxWidth={440}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => e.key === "Enter" && onSubmit()}
        type="search"
        enterkeyhint="search"
      />
      <Button
        display={{ base: "none", md: "block" }}
        marginLeft={mini ? 1 : 4}
        size={mini ? "sm" : "lg"}
        backgroundColor={mini ? "#222" : "#8f17c7"}
        _hover={{ backgroundColor: "#cc2def" }}
        _disabled={{ opacity: 0 }}
        disabled={value?.length === 0}
        onClick={onSubmit}
      >
        {!mini && "Search"}
        {mini && <SearchIcon color="white" />}
      </Button>
    </InputGroup>
  );
};

const IndexPageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [latestKeypress, setLatestKeypress] = React.useState<
    Date | undefined
  >();

  return (
    <>
      <Stack style={{ background: "#040d21" }}>
        <Box width="100%" position={"absolute"} zIndex={1}>
          <Box
            p={3}
            mx={2}
            pt={{ base: 90, md: 20 }}
            textAlign={{ base: "center", md: "left" }}
            maxWidth={1200}
            m="0 auto"
            color={"#fff"}
            fontSize={{ base: "38px", md: "42px", lg: "60px" }}
            fontFamily={"Montserrat"}
            fontWeight={700}
          >
            <Stack lineHeight={"1"}>
              <Box>The power of</Box>
              <Box>positive change</Box>
              <Box pt={5}>
                <SearchBar
                  mini={false}
                  value={query}
                  onChange={(e) => {
                    const pressAt = new Date();
                    const newQuery = e.target.value;
                    newQuery.length > query.length &&
                      setLatestKeypress(new Date());
                    setQuery(e.target.value);
                  }}
                  onSubmit={() => {
                    const cachedQuery = query;
                    setQuery("");
                    location.assign("/search?q=" + cachedQuery);
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
        <img
          src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
          alt="Glowing universe"
          style={{ position: "absolute" }}
        ></img>
        <>
          <Flex display={{ base: "none", md: "block" }}>
            <Canvas
              style={{ height: "80vh", width: "100%" }}
              colorManagement
              camera={{ position: [0, 0, 5] }}
            >
              <Lights />
              <Model latestKeypress={latestKeypress} />
            </Canvas>
          </Flex>
          <Flex display={{ base: "block", md: "none" }}>
            <Canvas
              style={{ height: "80vh", width: "100%" }}
              colorManagement
              camera={{ position: [0, 1.75, 5] }}
            >
              <Lights />
              <Model latestKeypress={latestKeypress} />
            </Canvas>
          </Flex>
        </>
      </Stack>
      <Box textAlign={{ base: "center", md: "left" }}>
        <Content>
          <Heading mt={{ base: 10, md: 20 }} size={"xl"} color={"#64a3cb"}>
            FEATURED
          </Heading>

          <Text
            fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
            fontFamily={"Montserrat"}
            fontWeight={600}
            opacity={0.4}
            mt={4}
            mb={400}
          >
            No featured organisations
          </Text>
        </Content>
      </Box>
    </>
  );
};

export default IndexPageComponent;
