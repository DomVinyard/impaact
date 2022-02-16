import { Box, Stack, Text } from "@chakra-ui/react";
import Loader from "components/Loader";
import Link from "next/link";
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
          <Link key={index} href={`/${org.slug}`}>
            <Box cursor={"pointer"} shadow="lg" rounded="lg">
              <Stack spacing={0}>
                <Text fontSize="md" p={4}>
                  {org.name}
                </Text>
              </Stack>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default OrgsList;
