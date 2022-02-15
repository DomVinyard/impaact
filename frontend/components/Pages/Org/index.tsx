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

const OrgPageComponent = ({ org }) => {
  console.log({ org });
  const router = useRouter();
  const [session] = useSession();
  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }}>
        {session?.id === org?.author_id && (
          <a href={`/${router?.query.slug}/edit`}>edit</a>
        )}
        <Content>{JSON.stringify(org)}</Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
