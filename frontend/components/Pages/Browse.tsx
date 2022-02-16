import React, { FC } from "react";
import { Box, Heading, Stack, Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

interface IProps {
  statusCode: number;
}

const BrowsePageComponent: FC<IProps> = ({ statusCode }) => {
  return (
    <Box>
      <Heading mt={{ base: 20, md: 20 }} size={"xl"} color={"#64a3cb"} mb={6}>
        GLOBAL GOALS
      </Heading>
      <Box background={"#eee"} height={400}></Box>
    </Box>
  );
};

export default BrowsePageComponent;
