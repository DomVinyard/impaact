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
  const { q } = router.query;
  const [query, setQuery] = React.useState(q);

  const linksForAuthenticatedUsers = [
    {
      id: "your-orgs",
      label: "Your Organisations",
      href: "/your-orgs",
    },
    // {
    //   id: "myAccount",
    //   label: "Settings",
    //   href: "/my-account",
    // },
  ];

  const signInButtonNode = () => {
    if (session) {
      return false;
    }
    return (
      <Box>
        <Link href="/api/auth/signin">
          <Button
            background={"none"}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            color="#fff"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
        </Link>

        <Link href="/api/auth/signin">
          <Button
            display={{
              base: router.pathname === "/" ? "inline-block" : "none",
              md: "inline-block",
            }}
            background={"none"}
            variant="outline"
            paddingY={1}
            _hover={{ bg: "#555" }}
            _active={{ bg: "#555" }}
            color="#fff"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Add your organisation
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <Box>
      <Box p={3} shadow="sm" pos="relative" background={"#040d21"}>
        <Box mx={2} maxWidth={1200} m="0 auto">
          <Stack
            isInline
            spacing={4}
            align="center"
            justifyContent="space-between"
            w="full"
            alignItems="center"
          >
            <Flex>
              <Stack
                as="a"
                isInline
                spacing={4}
                align="center"
                fontWeight="semibold"
                href={"/"}
              >
                <Image
                  src="/images/logo.png"
                  alt="PPS"
                  height={"27px"}
                  width={"36px"}
                  minW={"36px"}
                  maxW={"36px"}
                  pl={"8px"}
                />
              </Stack>
              {router.pathname !== "/" && (
                <SearchBar
                  mini
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onSubmit={() => {
                    const cachedQuery = query;
                    setQuery("");
                    location.assign("/search?q=" + cachedQuery);
                  }}
                />
              )}
            </Flex>
            <Box>
              <Stack isInline spacing={4} align="center">
                {signInButtonNode()}
                <Menu>
                  {session && (
                    <MenuButton
                      background={"none"}
                      _hover={{ bg: "#555" }}
                      _active={{ bg: "#555" }}
                      as={Button}
                      pl={"10px"}
                      pr={"0px"}
                      rightIcon={
                        <ChevronDownIcon
                          transform={"translateX(-6px)"}
                          color="#fff"
                        />
                      }
                    >
                      <Avatar src={session.user.image} alt="avatar" />
                    </MenuButton>
                  )}
                  <MenuList zIndex={2}>
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
