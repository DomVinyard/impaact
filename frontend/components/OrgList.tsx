import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Loader from "components/Loader";
import Link from "next/link";
import React from "react";
import IOrg from "types/org";

type Props = {
  orgs: IOrg[];
  loading: boolean;
  variant?: "mini" | "popular";
};

const PopularOrg = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Flex>
        <Box width={{ base: 16, md: 32 }} backgroundColor={"lightblue"}>
          img
        </Box>
        <Box
          cursor={"pointer"}
          background="#eee"
          textAlign={"left"}
          padding={4}
          flexGrow={1}
        >
          <Stack spacing={0}>
            <Text fontSize="sm">@{org.slug}</Text>
            <Text fontSize="md">{org.name}</Text>
            <Text fontSize="md">{org.description}</Text>
          </Stack>
        </Box>
      </Flex>
    </Skeleton>
  );
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
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      templateRows={{
        base: "repeat(3, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      gap={4}
    >
      {orgs?.map((org: IOrg, index: number) => (
        <GridItem rowSpan={1} colSpan={1}>
          <Link key={index} href={`/${org.slug}`}>
            {variant === "popular" ? (
              <PopularOrg org={org} loading={loading} />
            ) : (
              <MiniOrg org={org} />
            )}
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default OrgsList;
