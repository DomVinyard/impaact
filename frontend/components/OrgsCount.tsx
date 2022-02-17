import {
  Box,
  Heading,
  useBreakpointValue,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useCountOrgsQuery } from "generated-graphql";
import React, { useEffect } from "react";
import Content from "./Content";

const OrgsCountComponent = () => {
  const { data, error, loading } = useCountOrgsQuery();
  const total = data?.orgs_aggregate.aggregate.count;
  return (
    <Skeleton isLoaded={!loading && !!data}>
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        background={{ base: "#000", md: "transparent" }}
        zIndex={1}
        height={24}
        color={"white"}
      >
        <Content>
          <Flex
            justifyContent={{ base: "center", md: "left" }}
            alignItems="center"
          >
            <Text
              fontSize={{ base: 44, md: 58 }}
              fontFamily={"VT323"}
              paddingRight={2}
            >
              {`${total}`.padStart(3, "0")}
            </Text>{" "}
            <Text
              opacity={0.8}
              fontWeight={800}
              fontSize={{ base: 24, md: 24 }}
            >
              Organisations
            </Text>
          </Flex>
        </Content>
      </Box>
    </Skeleton>
  );
};

export default OrgsCountComponent;
