import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Content from "components/Layout/Content";
import { useSearchOrgsQuery } from "generated-graphql";
import OrgsList from "components/OrgList";

const SearchPageComponent = () => {
  const [session] = useSession();
  const heightOfNavbar: string = "74px";
  const containerPadding: string = "1rem";
  const router = useRouter();
  const { q } = router.query;

  const { data, error, loading } = useSearchOrgsQuery({
    variables: { q: `%${q}%` },
  });

  return (
    <Content>
      {<OrgsList orgs={data?.orgs} />}
      {!data.orgs.length && (
        <Stack>
          <Flex
            fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
            fontFamily={"Montserrat"}
            fontWeight={600}
            opacity={0.4}
          >
            0 results for "{q}"
          </Flex>
        </Stack>
      )}
    </Content>
  );
};

export default SearchPageComponent;
