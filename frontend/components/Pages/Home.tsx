import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Image,
  Text,
} from "@chakra-ui/react";
import Content from "components/Content";
import React from "react";
import SearchBar from "components/SearchBar";
import Globe from "components/Globe";
import { useSession } from "next-auth/client";
import PopularComponent from "components/Popular";
import ClosedComponent from "components/Closed";
import OrgsCountComponent from "components/OrgsCount";
import { AddOrgButton } from "components/Navbar";
import Link from "next/link";
import AboutUsComponent from "components/AboutUs";

const IS_CLOSED = true;

const HomePageComponent = () => {
  const [query, setQuery] = React.useState("");
  const [session] = useSession();
  const [isSearchFocusMobile, setIsSearchFocusMobile] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [latestKeypress, setLatestKeypress] = React.useState<
    Date | undefined
  >();

  const handleCloseMobileSearch = () => {
    setQuery("");
    setIsSearchFocusMobile(false);
  };

  if (IS_CLOSED && !session) return <ClosedComponent />;
  // console.log("ismobile", isMobile);

  return (
    <>
      <Stack
        background={"brand.900"}
        height={"auto"}
        position={"relative"}
        width={"auto"}
        marginTop={isSearchFocusMobile ? -235 : 0}
      >
        <Stack
          backgroundImage={
            'url("https://github.githubassets.com/images/modules/site/home/hero-glow.svg")'
          }
          backgroundSize={"cover"}
          backgroundPosition={["center", "center"]}
        >
          <Box
            width="100vw"
            position={"fixed"}
            left={0}
            top={0}
            zIndex={2}
            background={"brand.900"}
            height={"100vh"}
            display={isSearchFocusMobile ? "block" : "none"}
          />
          <Box
            width="100%"
            position={"absolute"}
            zIndex={isSearchFocusMobile ? 2 : 1}
          >
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
                      onClick={handleCloseMobileSearch}
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
          <Globe latestKeypress={latestKeypress} />
          <OrgsCountComponent />
        </Stack>
      </Stack>
      <>
        <Content display={{ base: "none", md: "block" }} mb={32}>
          <PopularComponent />
        </Content>
        <Box display={{ base: "block", md: "none" }} mb={1}>
          <PopularComponent />
        </Box>
      </>
      <AboutUsComponent />
    </>
  );
};

export default HomePageComponent;
