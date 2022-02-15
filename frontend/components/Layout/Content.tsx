import { Box, ChakraProvider, theme, VStack } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import React, { FC } from "react";

const Content: any = ({ children, isFull }) => {
  return (
    <Box
      maxW="1200"
      mx="auto"
      w={!isFull ? "95%" : { base: "100%", md: "95%" }}
      py={8}
      px={isFull ? 0 : { base: 2, md: 0 }}
    >
      {children}
    </Box>
  );
};

export default Content;
