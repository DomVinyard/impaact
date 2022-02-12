import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Link as _Link,
  Stack,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextComponentType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";

const Navbar: NextComponentType = () => {
  const [session] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  console.log({ session });

  const handleToggleTheme = () => {
    toggleColorMode();
  };

  const linksForAllUsers = [
    {
      id: "home",
      label: "PPS",
      href: "/",
    },
  ];

  const linksForAuthenticatedUsers = [
    {
      id: "feeds",
      label: "My Organisations",
      href: "/feeds",
    },
    {
      id: "myAccount",
      label: "Settings",
      href: "/my-account",
    },
  ];

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
        </Link>
      </Box>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <Box>
      <Box p={4} shadow="lg" pos="relative">
        <Box maxW="xl" mx="auto" w="full">
          <Stack
            isInline
            spacing={4}
            align="center"
            justifyContent="space-between"
            w="full"
          >
            <Box>
              <Stack isInline spacing={4} align="center" fontWeight="semibold">
                {linksForAllUsers.map((link) => {
                  return (
                    <Box key={link.id}>
                      <Link href={link.href}>
                        <_Link>{link.label}</_Link>
                      </Link>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
            <Box>
              <Stack isInline spacing={4} align="center">
                {signInButtonNode()}
                <Menu>
                  {session && (
                    <MenuButton
                      background={"none"}
                      as={Button}
                      rightIcon={
                        <ChevronDownIcon transform={"translateX(-6px)"} />
                      }
                    >
                      <Avatar src={session.user.image} alt="avatar" />
                    </MenuButton>
                  )}
                  <MenuList>
                    {linksForAuthenticatedUsers.map((link) => (
                      <MenuItem as="a" key={link.id} href={link.href}>
                        {link.label}
                      </MenuItem>
                    ))}
                    <MenuDivider />
                    <MenuItem
                      as="a"
                      href="/api/auth/signout"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const Avatar = styled(Image)`
  height: 32px;
  border-radius: 100%;
`;

export default Navbar;
