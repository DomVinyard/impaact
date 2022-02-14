import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Content from "components/Layout/Content";
import Loader from "components/Loader";
import AddNewFeedForm from "components/Pages/Feeds/AddNewFeedForm";
import Feed from "components/Pages/Feeds/Feed";
import { useFetchFeedsQuery } from "generated-graphql";
import React from "react";
import IFeed from "types/feed";

const FeedsPageComponent = () => {
  // const { data } = useFetchFeedsQuery();

  // if (!data) {
  //   return <Loader />;
  // }

  return (
    <Stack spacing={8}>
      <Content>
        <Heading mt={20} size={"xl"} color={"#64a3cb"}>
          YOUR ORGANISATIONS
        </Heading>

        <Text
          fontSize={{ base: "1.5rem", md: "1.75rem", lg: "2rem" }}
          fontFamily={"Montserrat"}
          fontWeight={600}
          opacity={0.4}
          mt={4}
          mb={400}
        >
          No organisations
        </Text>
      </Content>
      {/* {data.feeds.map((feed: IFeed, index: number) => {
        return (
          <Box key={index}>
            <Feed feed={feed} />
          </Box>
        );
      })} */}
    </Stack>
  );
};

export default FeedsPageComponent;
