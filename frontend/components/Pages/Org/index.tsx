import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

const MyOrgBar = () => {
  const router = useRouter();
  return (
    <Button
      leftIcon={<EditIcon />}
      colorScheme="gray"
      as="a"
      href={`/${router?.query.slug}/edit`}
      w="160px"
      ml={"auto"}
    >
      Edit
    </Button>
  );
};

const OrgPageComponent = ({ org }) => {
  const [session] = useSession();
  const isMyOrg = session?.id === org?.author_id;
  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }}>
        <Content>
          <Stack>
            {isMyOrg && <MyOrgBar />}
            <Box maxW={760}>
              <Heading mb={3} textAlign={"left"}>
                {org.name}
              </Heading>
              {org.description && (
                <Text fontSize={20} mb={3} textAlign={"left"}>
                  {org.description}
                </Text>
              )}
              <Code maxW={"100%"}>{JSON.stringify(org)}</Code>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
