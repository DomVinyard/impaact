import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import Content from "components/Content";
import React from "react";
import { AddOrgButton } from "components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/client";

const AboutUsComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const session = useSession();
  return (
    <Box background={"brand.900"} overflow={"none"}>
      <Box
        pt={{ base: 24, md: 32 }}
        pb={{ base: 24, md: 32 }}
        width={"100%"}
        backgroundImage="url(https://github.githubassets.com/images/modules/site/home/hero-glow.svg)"
      >
        <Content>
          <Stack>
            <Box w={"100%"} maxW={600}>
              <Box>
                <Heading
                  fontSize={{ base: "28px", md: "34px" }}
                  color={"#fff"}
                  fontFamily={"Montserrat"}
                  fontWeight={800}
                  textAlign={{ base: "center", md: "left" }}
                >
                  Our Vision
                </Heading>
              </Box>
            </Box>
            <Flex direction={{ base: "column", md: "row" }}>
              <Box
                // background={"#eee"}
                maxWidth={{ base: "100%", md: "480px" }}
                flex={1}
              >
                <Image
                  width={"100%"}
                  // mt={{ base: 4, md: 8 }}
                  src="images/pps.png"
                  // height="100%"
                />
              </Box>
              <Stack
                color={"white"}
                padding={{ base: 0, md: 8 }}
                alignItems="center"
                justifyContent={"center"}
                px={{ base: 6, md: "auto" }}
                flex={1}
              >
                <Box width={"100%"}>
                  {/* {!isMobile && ( */}
                  <>
                    <Text
                      mt={{ base: 8, md: 0 }}
                      fontSize={{ base: 20, md: 24 }}
                      fontWeight="bold"
                    >
                      We're building a transparent and accountable architecture
                      for good.
                    </Text>
                    <Text
                      fontSize={{ base: 20, md: 24 }}
                      mt={{ base: 6, md: 8 }}
                    >
                      We want to attract more philanthropic capital through
                      authentication and verification of impact. Join us in
                      providing more transparency to stakeholders and embedding
                      the voice of the world’s most in need.
                    </Text>
                  </>
                  {/* )} */}
                  <Flex
                    justifyContent={{ base: "center", md: "flex-start" }}
                    width={"100%"}
                    pt={{ base: 12, md: 8 }}
                    pb={{ base: 6, md: 8 }}
                  >
                    <Link href="/about">
                      <AddOrgButton
                        cursor={"pointer"}
                        children={"Learn more"}
                        size="lg"
                      />
                    </Link>
                  </Flex>
                </Box>
              </Stack>
            </Flex>
          </Stack>
        </Content>
      </Box>
    </Box>
  );
};

export default AboutUsComponent;
