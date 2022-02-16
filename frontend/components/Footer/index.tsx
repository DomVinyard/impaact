import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as _Link,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  MenuDivider,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextComponentType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "components/Pages/Landing";

const Footer: NextComponentType = () => {
  const [session] = useSession();
  const router = useRouter();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const footerHeight = isMobile ? "50vh" : 200;

  return (
    <Box pt={footerHeight} mt={"0 !important"}>
      <Box
        as={"footer"}
        px={3}
        // shadow="sm"
        pos="absolute"
        background={"#040d21"}
        bottom={0}
        width={"100%"}
      >
        <Flex
          alignItems={"flex-end"}
          mx={2}
          maxWidth={1200}
          m="0 auto"
          height={footerHeight}
          pb={5}
        >
          <Image
            src="/images/logo.png"
            alt="PPS"
            height={"24px"}
            width={"32px"}
            minW={"24px"}
            maxW={"32px"}
            pl={"8px"}
            mr={2}
          />
          <Text color={"rgb(140, 140, 172)"}>
            <strong>Impact PPS.</strong> Made with{" "}
            <span style={{ fontSize: 10 }}>💜</span> by{" "}
            <a
              href="https://insaangroup.org"
              style={{ textDecoration: "underline" }}
              target="_blank"
            >
              Insaan Group
            </a>
            .
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
