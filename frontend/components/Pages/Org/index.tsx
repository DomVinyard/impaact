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
      mr={4}
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
      <Box textAlign={{ base: "center", md: "left" }} pb={{ base: 0, md: 160 }}>
        <Content isFull>
          <Stack>
            {isMyOrg && <MyOrgBar />}
            <Box maxW={760}>
              <Stack px={{ base: 5, md: 0 }} mb={10} mt={4}>
                <Heading fontWeight={700} size={"2xl"} textAlign={"left"}>
                  {org.name}
                </Heading>
                {org.description && (
                  <Box
                    fontSize={{ base: 21, md: 24 }}
                    lineHeight={1.3}
                    textAlign={"left"}
                    pt={4}
                  >
                    <Text>{org.description}</Text>
                  </Box>
                )}
              </Stack>
              <Box height={160} p={4} color={"#777"} background={"#eee"}>
                Photo/Map
              </Box>
              <Box height={400} p={4} color={"#777"} background={"#ddd"}>
                Impact
              </Box>
              <Box height={200} p={4} color={"#777"} background={"#ccc"}>
                Operations
              </Box>
              <Box height={200} p={4} color={"#777"} background={"#bbb"}>
                Financial
              </Box>
              {/* <Code maxW={"100%"}>{JSON.stringify(org)}</Code> */}
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
