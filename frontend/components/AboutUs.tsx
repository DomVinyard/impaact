import { Box, Flex, Heading, Stack, Image, Text } from "@chakra-ui/react";
import Content from "components/Content";
import React from "react";
import { AddOrgButton } from "components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/client";

const AboutUsComponent = () => {
  const session = useSession();
  return (
    <Box background={"brand.900"} overflow={"none"}>
      <Box
        pt={{ base: 12, md: 20 }}
        pb={{ base: 6, md: 32 }}
        width={"100%"}
        backgroundImage="url(https://github.githubassets.com/images/modules/site/home/hero-glow.svg)"
        alt="Glowing universe"
        // style={{ position: "absolute" }}
      >
        <Content>
          <Stack>
            <Box w={"100%"} maxW={600}>
              <Box>
                <Heading
                  // mt={{ base: 20, md: 32 }}
                  fontSize={{ base: "28px", md: "34px" }}
                  color={"#fff"}
                  fontFamily={"Montserrat"}
                  fontWeight={800}
                >
                  Who are we?
                </Heading>
              </Box>
            </Box>
            <Flex
              direction={{ base: "column", md: "row" }}
              flex={{ base: "0 0 600px", md: "1" }}
            >
              <Image
                width={"100%"}
                maxWidth={"600px"}
                mt={{ base: 4, md: 6 }}
                src="images/video_placeholder.png"
              />
              <Stack
                color={"white"}
                flex={1}
                padding={{ base: 0, md: 8 }}
                alignItems="center"
                justifyContent={"center"}
                // marginTop={{ base: 8, md: 28 }}
                textAlign={"left"}
              >
                <Text fontSize={{ base: 17, md: 22 }}>
                  Pellentesque ligula arcu, mollis at turpis vel, cursus
                  dignissim lorem. Curabitur porta ut velit eget mattis. Aliquam
                  erat volutpat. Aenean euismod lacus vel interdum volutpat.
                  Quisque aliquet elit in dui egestas dictum. Donec eu risus
                  volutpat, aliquam neque eget, luctus libero.
                </Text>
                <Flex
                  alignItems={"flex-start"}
                  width={"100%"}
                  pt={{ base: 6, md: 8 }}
                  pb={{ base: 6, md: 8 }}
                >
                  <Link href="/orgs">
                    <AddOrgButton
                      cursor={"pointer"}
                      children={
                        session ? "Your organisations" : "Add your organisation"
                      }
                    />
                  </Link>
                </Flex>
              </Stack>
            </Flex>
          </Stack>
        </Content>
      </Box>
    </Box>
  );
};

export default AboutUsComponent;
