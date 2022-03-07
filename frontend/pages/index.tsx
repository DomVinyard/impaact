import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Landing from "components/Pages/Home";
import ClosedComponent from "components/Closed";

interface IProps {
  session: ISession;
}

const WHITELIST_ONLY = true;

const IndexPage: NextPage<IProps> = ({ session }) => {
  // console.log({ EMAIL: session.user.email, WHITELIST });
  const hasAccess = true;
  return hasAccess ? (
    <>
      <Head>
        <title>PPS/Impact</title>
      </Head>
      <Landing />
    </>
  ) : (
    <ClosedComponent />
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
