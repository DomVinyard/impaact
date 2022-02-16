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
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          as="a"
          href={"/orgs/add"}
          ml={"auto"}
          mr={isMobile ? 0 : 4}
          mt={3}
        >
          Add{!isMobile && " Organisation"}
        </Button>
        {/* </Box> */}
        <Heading>My Organisations</Heading>
        {<OrgsList orgs={orgs} />}
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
