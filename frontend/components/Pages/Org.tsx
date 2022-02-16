import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Content from "components/Content";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MyOrgBar = () => {
  const router = useRouter();
  return (
    <Link href={`/${router?.query.slug}/edit`}>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="gray"
        w="120px"
        ml={"auto"}
        mr={4}
        mt={3}
      >
        Edit
      </Button>
    </Link>
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
              <Stack
                px={{ base: 5, md: 0 }}
                mb={10}
                mt={{ base: 12, md: "100px" }}
              >
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
              <Box height={200} p={4} color={"#777"} background={"#eee"}>
                Photo/Map
              </Box>
              <Box height={460} p={4} color={"#777"} background={"#ddd"}>
                Impact
              </Box>
              <Box height={240} p={4} color={"#777"} background={"#ccc"}>
                Operations
              </Box>
              <Box height={240} p={4} color={"#777"} background={"#bbb"}>
                Financial
              </Box>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
