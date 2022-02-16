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
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextComponentType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "components/Pages/Landing";

const Navbar: NextComponentType = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <Box pt={200}>
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
          height={200}
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
            Impact PPS. Made with <span style={{ fontSize: 10 }}>💜</span> by{" "}
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

const Avatar = styled(Image)`
  height: 32px;
  border-radius: 100%;
`;

export default Navbar;
