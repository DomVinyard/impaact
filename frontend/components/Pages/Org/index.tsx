import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import OrgsList from "components/OrgList";
import { useFetchOrgQuery } from "generated-graphql";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Canvas } from "react-three-fiber";

const OrgPageComponent = () => {
  const router = useRouter();
  const { data, error, loading } = useFetchOrgQuery({
    variables: { id: router?.query.id },
  });

  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }}>
        <Content>{JSON.stringify(data)}</Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
