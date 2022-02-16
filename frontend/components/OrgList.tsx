import { Box, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import IOrg from "types/org";

type Props = {
  orgs: IOrg[];
  loading: boolean;
  variant?: "mini" | "popular";
};

const MiniOrg = ({ org }: { org: IOrg }) => {
  return (
    <Box cursor={"pointer"} background="#eee">
      <Stack spacing={0}>
        <Text fontSize="md" p={4}>
          {org.name}
        </Text>
      </Stack>
    </Box>
  );
};

const OrgsList = ({ orgs, loading, variant = "mini" }: Props) => {
  return (
    <Stack gap={4}>
      {orgs?.map((org: IOrg, index: number) => (
        <Link key={index} href={`/${org.slug}`}>
          <Box height={"100%"} cursor={"pointer"}>
            <MiniOrg org={org} />
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default OrgsList;
