import { Box, Stack } from "@chakra-ui/react";
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
        <h1>Your orgs</h1>
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
