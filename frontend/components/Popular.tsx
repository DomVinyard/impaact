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
import OrgsList from "components/OrgsList";
import { useFetchPopularQuery } from "generated-graphql";
import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import IOrg from "types/org";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PopularComponent = () => {
  const view = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  const { data, error, loading } = useFetchPopularQuery({
    variables: {
      top: view === "base" ? 5 : view === "md" ? 7 : 11,
    },
  });
  return (
    <Box pb={{ base: 4, md: 10 }}>
      <Heading
        mt={{ base: 14, md: 32 }}
        fontSize={{ base: "28px", md: "34px" }}
        fontFamily={"Montserrat"}
        fontWeight={"800"}
        size={"xl"}
        color={"#64a3cb"}
        mb={{ base: 8, md: 10 }}
      >
        Popular
      </Heading>
      <OrgsList
        orgs={data?.orgs}
        loading={loading}
        after={
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
        }
      />
    </Box>
  );
};

export default PopularComponent;
