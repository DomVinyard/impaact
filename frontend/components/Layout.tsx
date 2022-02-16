import { Box, ChakraProvider, Stack, theme } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import React, { FC } from "react";
import { extendTheme } from "@chakra-ui/react";

const Layout: FC = ({ children }) => {
  // 2. Call `extendTheme` and pass your custom values
  const theme = extendTheme({
    colors: {
      brand: {
        900: "#040d21",
      },
    },
  });

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
