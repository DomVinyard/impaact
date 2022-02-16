import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Content from "components/Content";
import Loader from "components/Loader";
import OrgsList from "components/OrgList";
import { useMyOrgsQuery } from "generated-graphql";
import { getSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import IOrg from "types/org";

const OrgsPageComponent = ({ userId }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data, error, loading } = useMyOrgsQuery({
    variables: { userId },
  });

  if (!data) {
    return <Loader />;
  }

  const orgs = data.users_by_pk?.orgs || [];
  return (
    <Content>
      <Stack spacing={8}>
        {/* <Box> */}
        <Link href={"/orgs/add"}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            ml={"auto"}
            mr={isMobile ? 0 : 4}
            mt={3}
          >
            Add{!isMobile && " Organisation"}
          </Button>
        </Link>
        {/* </Box> */}
        <Heading>My Organisations</Heading>
        {<OrgsList orgs={orgs} loading={loading} />}
        {!orgs.length && (
          <Text pt={6} fontSize={"1.25rem"}>
            None yet
          </Text>
        )}
      </Stack>
    </Content>
  );
};

export default OrgsPageComponent;
