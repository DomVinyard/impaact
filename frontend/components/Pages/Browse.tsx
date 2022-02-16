import React, { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Content from "components/Content";

const BrowsePageComponent: FC = () => {
  return (
    <Box>
      <Content>
        <Heading mt={{ base: 20, md: 20 }} size={"xl"} color={"#64a3cb"} mb={6}>
          BROWSE
        </Heading>
        <Box background={"#eee"} height={400}></Box>
      </Content>
    </Box>
  );
};

export default BrowsePageComponent;
