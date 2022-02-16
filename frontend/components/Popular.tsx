import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
  Skeleton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import OrgsList from "components/OrgList";
import { useFetchPopularQuery } from "generated-graphql";
import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import IOrg from "types/org";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PopularOrg = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
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

const PopularComponent = () => {
  const view = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  const { data, error, loading } = useFetchPopularQuery({
    variables: {
      top: view === "base" ? 5 : view === "md" ? 7 : 11,
    },
  });
  return (
    <Box pb={{ base: 4, md: 10 }}>
      <Heading mt={{ base: 10, md: 32 }} size={"xl"} color={"#64a3cb"} mb={6}>
        POPULAR
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        autoRows={"1fr"}
        gap={4}
      >
        {data?.orgs?.map((org: IOrg, index: number) => (
          <GridItem rowSpan={1} colSpan={1} background="#ccc">
            <Link key={index} href={`/${org.slug}`}>
              <Box height={"100%"} width={"100%"} cursor={"pointer"}>
                <PopularOrg org={org} loading={loading} />
              </Box>
            </Link>
          </GridItem>
        ))}
        <GridItem rowSpan={1} colSpan={1} background="#ccc">
          <Link href={"/browse"}>
            <Flex
              height={"100%"}
              width={"100%"}
              cursor={"pointer"}
              alignItems={"center"}
              justifyContent={"center"}
              color="#444"
            >
              View More <ChevronRightIcon />
            </Flex>
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PopularComponent;
