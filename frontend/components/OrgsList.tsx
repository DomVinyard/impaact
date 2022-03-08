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
// import OrgCard from "./OrgCard";

const OrgCard = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Stack
        background={"#ddd"}
        borderTop={{ base: "1px solid #ccc", md: "none" }}
        marginBottom={{ base: 4, md: 0 }}
      >
        <Stack
          spacing={0}
          textAlign={"left"}
          paddingX={4}
          paddingTop={{ base: 2, md: 2 }}
          color="black"
        >
          <Text fontSize="md" fontWeight={"700"}>
            {org.name}
          </Text>
        </Stack>
        <Flex>
          <Box
            backgroundImage={`url(https://picsum.photos/seed/${org.slug}/200/300)`}
            backgroundSize="cover"
            backgroundPosition={"center center"}
            minHeight={{ base: 32, md: 28 }}
            justifyContent="flex-end"
            width={"100%"}
            flex={2}
          />
          <Box
            backgroundImage={`/images/map_placeholder.png`}
            backgroundSize="cover"
            backgroundPosition={["center", "center"]}
            cursor={"pointer"}
            textAlign={"left"}
            flex={1}
          />
        </Flex>
      </Stack>
    </Skeleton>
  );
};

type ListProps = {
  orgs: any;
  loading?: boolean;
  after?: any;
};
const SDGs = [
  { number: 1, goal: "no poverty", color: "#B53841" },
  { number: 2, goal: "zero hunger", color: "#C7A756" },
  { number: 3, goal: "good health and well-being", color: "#769D4E" },
  { number: 4, goal: "quality education", color: "#9B2E34" },
  { number: 5, goal: "gender equality", color: "#CC4A33" },
  { number: 6, goal: "clean water and sanitation", color: "#80BADC" },
];

const OrgsList = ({ orgs, loading, after }: ListProps) => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const [submitting, setSubmitting] = React.useState<IOrg | undefined>();
  if (!columns) return null;
  return (
    <Grid
      templateColumns={`repeat(${columns}, 1fr)`}
      autoRows={"1fr"}
      gap={{ base: 0, md: 4 }}
    >
      {orgs?.map((org: IOrg, index: number) => {
        return (
          <Skeleton isLoaded={!loading}>
            <GridItem
              key={org.slug}
              rowSpan={1}
              colSpan={1}
              background={"#eee"}
              borderBottom={{ base: "4px solid #eee", md: "none" }}
            >
              <Link key={index} href={`/${org.slug}`}>
                <Box
                  onClick={() => setSubmitting(org)}
                  height={"100%"}
                  width={"100%"}
                  cursor={"pointer"}
                >
                  <OrgCard org={org} loading={loading} />
                </Box>
              </Link>
            </GridItem>
          </Skeleton>
        );
      })}
      {after}
    </Grid>
  );
};

export default OrgsList;
