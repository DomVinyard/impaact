import React, { FC } from "react";
import { Box, Heading, Stack, Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Content from "components/Content";

interface IProps {
  statusCode: number;
}

const BrowsePageComponent: FC<IProps> = ({ statusCode }) => {
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
