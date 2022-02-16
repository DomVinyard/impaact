import { Box, ChakraProvider, Stack, theme } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import React, { FC } from "react";

const Layout: FC = ({ children }) => {
  theme.styles.global = {
    ...theme.styles.global,
    "body, html": {
      height: "100%",
      minHeight: "100vh",
    },
  };
  return (
    <ChakraProvider theme={theme}>
      <Stack
        style={{ position: "relative" }}
        height={"100%"}
        minHeight={"100vh"}
      >
        <Navbar />
        <Box p={0} mt={"0px !important"} mb={"200px"}>
          {children}
        </Box>
        <Footer />
      </Stack>
    </ChakraProvider>
  );
};

export default Layout;
