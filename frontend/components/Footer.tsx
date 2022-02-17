import {
  Box,
  Link as _Link,
  Image,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NextComponentType } from "next";
import { useSession } from "next-auth/client";
import React from "react";
import { useRouter } from "next/router";

export const footerHeight = { base: "33vh", md: "200px" };
const Footer: NextComponentType = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={footerHeight} mt={"0 !important"}>
      <Box
        as={"footer"}
        px={3}
        pos="absolute"
        background={"brand.900"}
        bottom={0}
        width={"100%"}
      >
        <Flex
          alignItems={"flex-end"}
          mx={2}
          maxWidth={1200}
          m="0 auto"
          height={footerHeight}
          fontSize={13}
          pb={8}
        >
          <Image
            src="/images/logo.png"
            alt="PPS"
            height={"18px"}
            width={"28px"}
            pl={"8px"}
            mr={2}
          />
          <Text color={"rgb(140, 140, 172)"}>
            <strong>Impact PPS.</strong> Made with <span>💜</span> by{" "}
            <a
              href="https://insaangroup.org"
              style={{ textDecoration: "underline" }}
              target="_blank"
            >
              Insaan
            </a>
            .
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
