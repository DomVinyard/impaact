import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
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
  useBreakpointValue,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import OrgsList from "components/OrgList";
import { useFetchOrgsQuery, useSearchOrgsLazyQuery } from "generated-graphql";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import { Query } from "@apollo/client/react/components";

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  mini,
  onFocus,
  onBlur,
}: any) => {
  const [searchOrgs] = useSearchOrgsLazyQuery();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getAsyncOptions = async (inputValue) => {
    const { data } = await searchOrgs({ variables: { q: `%${inputValue}%` } });
    return await [
      {
        label: `Search for "${inputValue}"`,
        value: "@search",
      },
      ...data?.orgs?.map((org) => ({
        label: org.name,
        value: org.slug,
      })),
    ];
  };
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
      <AsyncSelect
        tagVariant={mini ? "subtle" : "outline"}
        onChange={(option) => {
          if (option.value === "@search") {
            location.href = `/search?q=${value}`;
          } else {
            location.href = `/${option.value}`;
          }
        }}
        loadOptions={(inputValue) => {
          onChange(inputValue);
          return getAsyncOptions(inputValue);
        }}
        chakraStyles={{
          input: (provided) => ({
            width: "100%",
            background: "none",
            marginLeft: "1.5rem",
            outline: "none",
          }),
          inputContainer: (provided) => ({
            width: "100%",
            maxW: "440px",
            marginLeft: mini ? 2 : 0,
          }),
          container: (provided) => ({
            width: "100%",
            maxWidth: 440,
          }),
          placeholder: (provided) => ({
            ...provided,
            marginLeft: "1.5rem",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            background: "none",
            display: "none",
          }),
          menu: (provided) => ({
            ...provided,
            width: "100%",
            maxW: "440px",
            color: "black",
            display: !value.length ? "none" : "block",
          }),
        }}
        // width={{ input: "100%", inputContainer: "100%" }}
        size={mini ? "sm" : "lg"}
        placeholder={mini ? "Search" : "Search charity or organisation"}
        autoFocus={!mini && !isMobile}
        // maxWidth={{ input: 440, inputContainer: 440 }}
        value={value}
        // onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {/* <Button
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
      </Button> */}
    </InputGroup>
  );
};

const IndexPageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [isSearchFocusMobile, setIsSearchFocusMobile] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [latestKeypress, setLatestKeypress] = React.useState<
    Date | undefined
  >();
  const { data, error, loading } = useFetchOrgsQuery();

  // useEffect(() => {
  //   if (isMobile && !isSearchFocusMobile) {
  //     setLatestKeypress(new Date());
  //   }
  // }, [isMobile, isSearchFocusMobile]);

  return (
    <>
      <Stack
        style={{
          background: "#040d21",
          marginTop: isSearchFocusMobile ? -245 : 0,
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
            pt={{ base: "75px", md: 20 }}
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
              <Box>positive impact</Box>
              <Flex pt={5}>
                {isSearchFocusMobile && (
                  <Button
                    size={"lg"}
                    width={1}
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
                  mini={false}
                  value={query}
                  onFocus={() => isMobile && setIsSearchFocusMobile(true)}
                  // onBlur={() => isMobile && setIsSearchFocusMobile(false)}
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
          style={{ position: "absolute" }}
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
      <Box mb={200} textAlign={{ base: "center", md: "left" }}>
        <Content>
          <Heading
            mt={{ base: 10, md: 20 }}
            size={"xl"}
            color={"#64a3cb"}
            mb={8}
          >
            FEATURED
          </Heading>

          {<OrgsList orgs={data?.orgs} />}
        </Content>
      </Box>
    </>
  );
};

export default IndexPageComponent;
