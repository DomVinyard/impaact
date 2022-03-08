import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  Box,
  Flex,
} from "@chakra-ui/react";
import Content from "components/Content";
import Loader from "components/Loader";
import OrgsList from "components/OrgsList";
import {
  useFetchOrgQuery,
  useFetchOrgsQuery,
  useMyOrgsQuery,
} from "generated-graphql";
import { getSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import IOrg from "types/org";

const OrgsPageComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Content isFull={isMobile} py={8}>
      <Stack spacing={8}>
        <Heading textAlign={{ base: "center", md: "left" }}>About PPS</Heading>
        Lorum ipsum
      </Stack>
    </Content>
  );
};

export default OrgsPageComponent;
