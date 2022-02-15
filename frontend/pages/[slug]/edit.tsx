import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import AddEditOrg from "components/Pages/AddEditOrg";

interface IProps {
  session: ISession;
}

const OrgPage: NextPage<IProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Org</title>
      </Head>
      <AddEditOrg />
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

export default OrgPage;
