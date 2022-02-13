import { Box, ChakraProvider, theme, VStack } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import React, { FC } from "react";

const Content: FC = ({ children }) => {
  return (
    <Box maxW="1200" mx="auto" w="95%" py={8} px={2}>
      {children}
    </Box>
  );
};

export default Content;
