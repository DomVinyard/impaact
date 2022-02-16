import { Box, Stack, Text } from "@chakra-ui/react";
import Loader from "components/Loader";
import React from "react";
import IOrg from "types/org";

type Props = {
  orgs: IOrg[];
  loading: boolean;
};

const OrgsList = ({ orgs, loading }: Props) => {
  if (loading) return <Text>loading</Text>;
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
