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
import { NextComponentType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import SearchBar from "components/SearchBar";

export const AddOrgButton = (additionalProps) => {
  return (
    <Button
      background={"none"}
      variant="outline"
      paddingY={1}
      _hover={{ bg: "#555" }}
      _active={{ bg: "#555" }}
      color="#fff"
      children={"Add your organisation"}
      {...additionalProps}
    />
  );
};

const Navbar: NextComponentType = () => {
  const [session] = useSession();
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = React.useState(q);

  const signInOrUp = (e) => {
    e.preventDefault();
    signIn({ callbackUrl: "/orgs" });
  };

  const signInButtonNode = () => {
    if (session) return false;
    return (
      <Box>
        <Button
          background={"none"}
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
          color="#fff"
          onClick={signInOrUp}
          children="Sign In"
        />
        <AddOrgButton
          display={{
            base: router.pathname === "/" ? "inline-block" : "none",
            md: "inline-block",
          }}
          onClick={signInOrUp}
        />
      </Box>
    );
  };

  return (
    <Box>
      <Box p={3} shadow="sm" pos="relative" background={"brand.900"}>
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
              <Stack isInline spacing={4} align="center" fontWeight="semibold">
                <Link href="/">
                  <Image
                    cursor={"pointer"}
                    src="/images/logo.png"
                    alt="PPS"
                    height={"27px"}
                    width={"36px"}
                    minW={"36px"}
                    maxW={"36px"}
                    pl={"8px"}
                  />
                </Link>
              </Stack>
              {router.pathname !== "/" && (
                <Box
                  width={260}
                  display={{ base: "none", md: "block" }}
                  color="white"
                >
                  <SearchBar
                    mini
                    value={query}
                    onChange={(value) => setQuery(value)}
                    onSubmit={() => {
                      const cachedQuery = query;
                      setQuery("");
                      location.assign("/search?q=" + cachedQuery);
                    }}
                  />
                </Box>
              )}
            </Flex>
            <Box>
              <Stack isInline spacing={4} align="center">
                {signInButtonNode()}
                <Menu>
                  {session && (
                    <MenuButton
                      background={"none"}
                      _hover={{ bg: "#333" }}
                      _active={{ bg: "#333" }}
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
                      <Image
                        height="32px"
                        borderRadius="100%"
                        src={session.user.image}
                        alt="avatar"
                      />
                    </MenuButton>
                  )}
                  <MenuList zIndex={2}>
                    <Link href="/orgs">
                      <MenuItem>Your Organisations</MenuItem>
                    </Link>
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: "/" });
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

export default Navbar;
