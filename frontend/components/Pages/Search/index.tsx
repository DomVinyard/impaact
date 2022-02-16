import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
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
      <Stack mt={6}>
        <Stack
          // fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontFamily={"Montserrat"}
          fontWeight={600}
          opacity={0.4}
        >
          {data?.orgs.length > 0 && (
            <Text>{data?.orgs.length || 0} results</Text>
          )}
          {!data?.orgs.length && (
            <>
              <Text pt={6} fontSize={"1.25rem"}>
                No results for <strong>{q}</strong>
              </Text>
              <Box pt={6}>
                <Text pb={2}>Suggestions:</Text>
                <List>
                  <ListItem>
                    • Make sure all words are spelled correctly
                  </ListItem>
                  <ListItem>• Try different keywords</ListItem>
                  <ListItem>• Try more general keywords</ListItem>
                </List>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
      {<OrgsList orgs={data?.orgs} />}
    </Content>
  );
};

export default SearchPageComponent;
