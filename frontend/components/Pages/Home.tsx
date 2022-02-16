import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import Content from "components/Content";
import React from "react";
import SearchBar from "components/SearchBar";
import Globe from "components/Globe";
import { useSession } from "next-auth/client";
import PopularComponent from "components/Popular";
import ClosedComponent from "components/Closed";

const IS_CLOSED = true;

const HomePageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [session] = useSession();
  const [isSearchFocusMobile, setIsSearchFocusMobile] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [latestKeypress, setLatestKeypress] = React.useState<
    Date | undefined
  >();

  if (IS_CLOSED && !session) return <ClosedComponent />;

  return (
    <>
      <Stack
        background={"brand.900"}
        height={"auto"}
        position={"relative"}
        width={"auto"}
        marginTop={isSearchFocusMobile ? -235 : 0}
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
              <>
                <Box>Measuring</Box>
                <Box>positive impact</Box>
              </>
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
      <Box textAlign={{ base: "center", md: "left" }}>
        <Content>
          <PopularComponent />
          <Box mb={{ base: 20, md: 32 }}></Box>
        </Content>
        <Box
          background={"brand.900"}
          height={{ base: 420, md: 660 }}
          overflow={"none"}
        >
          <Box
            height={{ base: 420, md: 660 }}
            width={"100%"}
            backgroundImage="url(https://github.githubassets.com/images/modules/site/home/hero-glow.svg)"
            alt="Glowing universe"
            style={{ position: "absolute", pointerEvents: "none" }}
          />
          <Content>
            <Box>
              <Heading
                // mt={{ base: 20, md: 32 }}
                size={"xl"}
                color={"#fff"}
                fontFamily={"Montserrat"}
                fontWeight={800}
                pt={{ base: 8, md: 16 }}
              >
                About Impact PPS
              </Heading>
            </Box>
          </Content>
        </Box>
      </Box>
    </>
  );
};

export default HomePageComponent;
