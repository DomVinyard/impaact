import { ApolloProvider } from "@apollo/client";
import Layout from "components/Layout";
import { useApollo } from "lib/apolloClient";
import { Provider as NextAuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import ISession from "types/session";

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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800"
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
