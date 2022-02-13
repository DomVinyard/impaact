import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Landing from "components/Pages/Landing";

interface IProps {
  session: ISession;
}

const IndexPage: NextPage<IProps> = ({ session }) => {
  if (!session) {
    return <Landing />;
  }

  return (
    <>
      <Head>
        <title>Impact</title>
      </Head>
      <Landing />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
