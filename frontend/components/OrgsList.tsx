import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  Text,
  Skeleton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Link from "next/link";
import IOrg from "types/org";
import Loader from "./Loader";

type ListProps = {
  orgs: any;
  loading?: boolean;
  after?: any;
};

const MiniOrg = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Flex background="#eee">
        <Box width={{ base: 16, md: 32 }} backgroundColor={"lightblue"}>
          img
        </Box>
        <Box cursor={"pointer"} textAlign={"left"} padding={4} flexGrow={1}>
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

const OrgsList = ({ orgs, loading, after }: ListProps) => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const [submitting, setSubmitting] = React.useState<IOrg | undefined>();
  if (!columns) return null;
  if (submitting) return <Loader message={submitting?.name} />;
  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} autoRows={"1fr"} gap={4}>
      {orgs?.map((org: IOrg, index: number) => (
        <GridItem rowSpan={1} colSpan={1} background="#ccc">
          <Link key={index} href={`/${org.slug}`}>
            <Box
              onClick={() => setSubmitting(org)}
              height={"100%"}
              width={"100%"}
              cursor={"pointer"}
            >
              <MiniOrg org={org} loading={loading} />
            </Box>
          </Link>
        </GridItem>
      ))}
      {after}
    </Grid>
  );
};

export default OrgsList;
