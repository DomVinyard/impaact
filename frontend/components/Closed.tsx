import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const ClosedComponent = () => {
  return (
    <>
      <Stack
        background={"brand.900"}
        height={"100vh"}
        position={"fixed"}
        width={"100vw"}
        marginTop={0}
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
          width={"100%"}
        >
          <Stack lineHeight={"1"}>
            <Box mt={"25vh"}>Invite only atm</Box>
            <Link href={"mailto:i@dom.vin"}>
              <Text
                fontWeight={"normal"}
                cursor={"pointer"}
                fontSize={{ base: "16px", md: "20px" }}
                pt={8}
              >
                Request access <ChevronRightIcon />
              </Text>
            </Link>
          </Stack>
        </Box>
        <img
          src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
          alt="Glowing universe"
          style={{ position: "absolute", pointerEvents: "none" }}
        />
      </Stack>
    </>
  );
};

export default ClosedComponent;
