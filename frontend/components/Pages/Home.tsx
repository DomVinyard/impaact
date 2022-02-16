import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Content from "components/Content";
import OrgsList from "components/OrgList";
import { useFetchOrgsQuery } from "generated-graphql";
import React from "react";
import SearchBar from "components/SearchBar";
import Globe from "components/Globe";

const HomePageComponent = () => {
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
          background: "brand.900",
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
            background={"brand.900"}
            height={"100vh"}
          />
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
                    if (value.length > query.length)
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
        />
        <Globe latestKeypress={latestKeypress} />
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
              RECENTLY ADDED
            </Heading>
            {<OrgsList orgs={data?.orgs} loading={loading} />}
          </Box>
          <Box>
            <Heading
              mt={{ base: 20, md: 20 }}
              size={"xl"}
              color={"#64a3cb"}
              mb={6}
            >
              GLOBAL GOALS
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

export default HomePageComponent;
