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
import Content from "./Content";

const PopularComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const top = useBreakpointValue({ base: 7, md: 9, lg: 11 });
  const { data, error, loading } = useFetchPopularQuery({
    variables: { top },
  });
  return (
    <Box pb={{ base: 4, md: 10 }}>
      <Heading
        mt={{ base: 14, md: 32 }}
        fontSize={{ base: "28px", md: "34px" }}
        fontFamily={"Montserrat"}
        fontWeight={"800"}
        size={"xl"}
        mb={{ base: 8, md: 10 }}
        display={isMobile ? "none" : "block"}
      >
        Trending
      </Heading>
      <OrgsList
        orgs={data?.orgs}
        loading={loading}
        after={
          <GridItem rowSpan={1} colSpan={1}>
            <Link href={"/browse"}>
              <Flex
                height={"100%"}
                width={"100%"}
                cursor={"pointer"}
                alignItems={"center"}
                justifyContent={"center"}
                color="#444"
                background="#ccc"
              >
                Find Amazing Organisations
                <ChevronRightIcon />
              </Flex>
            </Link>
          </GridItem>
        }
      />
    </Box>
  );
};

export default PopularComponent;
