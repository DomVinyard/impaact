import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import { Provider as NextAuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { FC } from "react";
import ISession from "types/session";

import { Box, ChakraProvider, Stack, theme } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import Footer, { footerHeight } from "components/Footer";
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
        <Box p={0} mt={"0px !important"} mb={footerHeight}>
          {children}
        </Box>
        <Footer />
      </Stack>
    </ChakraProvider>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const { session }: { session: ISession } = pageProps;
  const apolloClient = useApollo(pageProps.initialApolloState, session?.token);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Satisfy&family=VT323&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <NextAuthProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </NextAuthProvider>
    </>
  );
};

export default App;
