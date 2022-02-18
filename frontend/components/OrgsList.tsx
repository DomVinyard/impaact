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
import OrgCard from "./OrgCard";

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

function randomColor(seed) {
  var hash = 0,
    len = seed.length;
  for (var i = 0; i < len; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  var x = Math.sin(hash++) * 10000;
  const randomNum = x - Math.floor(x);
  const index = Math.floor(randomNum * SDGs.length);
  return SDGs[index].color;
}

const OrgsList = ({ orgs, loading, after }: ListProps) => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const [submitting, setSubmitting] = React.useState<IOrg | undefined>();
  if (!columns) return null;
  if (submitting) return <Loader message={submitting?.name} />;

  return (
    <Grid
      templateColumns={`repeat(${columns}, 1fr)`}
      autoRows={"1fr"}
      gap={{ base: 0, md: 4 }}
    >
      {orgs?.map((org: IOrg, index: number) => {
        const BACKGROUND_FROM_SDG = randomColor(org.slug);
        return (
          <GridItem
            key={org.slug}
            rowSpan={1}
            colSpan={1}
            background={BACKGROUND_FROM_SDG}
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
        );
      })}
      {after}
    </Grid>
  );
};

export default OrgsList;
