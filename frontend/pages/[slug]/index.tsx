import React from "react";
import Head from "next/head";
// import Page from "components/Pages/Dashboard/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";
import Org from "components/Pages/Org";
import { initializeApollo } from "lib/apolloClient";
import { FetchOrgDocument } from "generated-graphql";
import { useRouter } from "next/router";

interface IProps {
  session: ISession;
  org: any;
}

const OrgPage: NextPage<IProps> = ({ org }) => {
  return (
    <>
      <Head>
        <title>{org?.name || "org"}</title>
      </Head>
      <Org org={org} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const apolloClient = initializeApollo({}, session?.token);
  const { data } = await apolloClient.query({
    query: FetchOrgDocument,
    variables: {
      slug: query.slug,
    },
  });
  const [org] = data?.orgs || [];
  return { props: { session, org } };
};

export default OrgPage;
