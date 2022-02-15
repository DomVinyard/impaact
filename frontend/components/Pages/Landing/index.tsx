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
import { useFetchOrgsQuery } from "generated-graphql";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Lights from "./components/Light";
import Model from "./components/Model";

import { CUIAutoComplete } from "chakra-ui-autocomplete";

export interface Item {
  label: string;
  value: string;
}
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  mini,
  onFocus,
  onBlur,
}: any) => {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
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

      {/* <CUIAutoComplete
        placeholder="Type a Country"
        // onCreateItem={handleCreateItem}
        items={pickerItems}
        selectedItems={selectedItems}
        // onSelectedItemsChange={(changes) =>
        //   handleSelectedItemsChange(changes.selectedItems)
        // }
      /> */}
      <Input
        // items={pickerItems}
        // as={Input}
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
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={(e) => e.key === "Enter" && value?.length > 0 && onSubmit()}
        type="search"
        enterKeyHint="search"
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
          marginTop: isSearchFocusMobile ? -260 : 0,
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
              <Box>positive impact</Box>
              <Flex pt={5}>
                {isSearchFocusMobile && (
                  <Button
                    size={"lg"}
                    background={"none"}
                    colorScheme={"blue"}
                    onClick={() => setIsSearchFocusMobile(false)}
                  >
                    <ArrowBackIcon color="gray.300" />
                  </Button>
                )}
                <SearchBar
                  mini={false}
                  value={query}
                  onFocus={() => isMobile && setIsSearchFocusMobile(true)}
                  onBlur={() => isMobile && setIsSearchFocusMobile(false)}
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
              style={{ height: "80vh", width: "100%" }}
              colorManagement
              camera={{ position: [-1, -0.25, 4.5] }}
            >
              <Lights />
              <Model latestKeypress={latestKeypress} baseSpeed={0.001} />
            </Canvas>
          </Flex>
          <Flex display={{ base: "block", md: "none" }}>
            <Canvas
              style={{ height: "80vh", width: "100%" }}
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
