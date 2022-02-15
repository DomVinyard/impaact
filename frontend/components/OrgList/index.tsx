import { Box, Stack, Text } from "@chakra-ui/react";
import Loader from "components/Loader";
import AddNewOrgForm from "components/Pages/MyOrgs/AddNewOrgForm";
import React from "react";
import IOrg from "types/org";

const OrgsList = ({ orgs }) => {
  return (
    <Stack spacing={8}>
      {orgs?.map((org: IOrg, index: number) => {
        return (
          <Box as="a" key={index} href={`/${org.slug}`}>
            <Box shadow="lg" rounded="lg">
              <Stack spacing={0}>
                <Text fontSize="md" p={4}>
                  {org.name}
                </Text>
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};

export default OrgsList;
