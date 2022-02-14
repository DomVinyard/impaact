import { Box, Stack } from "@chakra-ui/react";
import Loader from "components/Loader";
import OrgsList from "components/OrgList";
import AddNewOrgForm from "components/Pages/Orgs/AddNewOrgForm";
import Org from "components/Pages/Orgs/Org";
import { useMyOrgsQuery } from "generated-graphql";
import { getSession } from "next-auth/client";
import React from "react";
import IOrg from "types/org";

const OrgsPageComponent = ({ session }) => {
  const { data, error, loading } = useMyOrgsQuery({
    variables: { userId: session?.id },
  });
  console.log({ data, error, loading });

  if (!data) {
    return <Loader />;
  }

  return (
    <Stack spacing={8}>
      <Box>
        <AddNewOrgForm />
      </Box>
      {<OrgsList orgs={data.users_by_pk?.orgs} />}
    </Stack>
  );
};

export default OrgsPageComponent;
