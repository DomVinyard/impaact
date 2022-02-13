import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const SearchPageComponent = () => {
  const [session] = useSession();
  const heightOfNavbar: string = "74px";
  const containerPadding: string = "1rem";
  const router = useRouter();
  const { q } = router.query;

  return (
    <Stack>
      <Flex>0 results for "{q}"</Flex>
    </Stack>
  );
};

export default SearchPageComponent;
