import { Box } from "@chakra-ui/react";
import React from "react";

const Content: any = ({ isFull, ...others }) => {
  return (
    <Box
      maxW="1200"
      mx="auto"
      w={!isFull ? "95%" : { base: "100%", md: "95%" }}
      px={isFull ? 0 : { base: 2, md: 0 }}
      {...others}
    />
  );
};

export default Content;
