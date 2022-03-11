import React from "react";
import Head from "next/head";
import Page from "components/Pages/Org/Impact";
import { NextPage } from "next";

const ImpactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Impact Page</title>
      </Head>
      <Page />
    </>
  );
};

export default ImpactPage;
