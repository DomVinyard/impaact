import { Box, Stack } from "@chakra-ui/react";
import Loader from "components/Loader";
import AddNewOrgForm from "components/Pages/Orgs/AddNewOrgForm";
import Org from "components/Pages/Orgs/Org";
import React from "react";
import IOrg from "types/org";

const OrgsList = ({ orgs }) => {
  return (
    <Stack spacing={8}>
      {orgs?.map((org: IOrg, index: number) => {
        return (
          <Box key={index}>
            <Org org={org} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default OrgsList;
