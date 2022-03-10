import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import Content from "components/Content";
import SDGs from "lib/SDGs";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

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

const OrgPageComponent = ({ org, loading }) => {
  const [session] = useSession();
  const isMyOrg = session?.id === org?.author_id;
  const sdgs = Object.values(
    org?.impacts?.reduce((acc, impact) => {
      if (!acc?.[impact.sdg])
        acc[impact.sdg] = {
          sdg: SDGs.find((sdg) => sdg.id === impact.sdg),
          impacts: [],
        };
      acc[impact.sdg].impacts.push(impact);
      return acc;
    }, {})
  );

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

              <Skeleton isLoaded={!loading}>
                <Flex height={200} color={"#777"}>
                  <Box
                    backgroundImage={`url(${org.main_image})`}
                    backgroundSize="cover"
                    backgroundPosition={"center center"}
                    minHeight={{ base: 32, md: 28 }}
                    justifyContent="flex-end"
                    width={"100%"}
                    flex={1}
                  />

                  <Box
                    backgroundImage={`/images/map_placeholder.png`}
                    backgroundSize="cover"
                    backgroundPosition={["center", "center"]}
                    flex={1}
                    overflow={"hidden"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {org.geography && (
                      <StaticGoogleMap
                        size="600x600"
                        apiKey="AIzaSyAEsz877McL_8NQD7sRqiz420HjW4XHjIs"
                      >
                        {org.geography.split(",").map((location) => (
                          <Marker location={location.trim()} />
                        ))}
                      </StaticGoogleMap>
                    )}
                  </Box>
                </Flex>
                <Box color={"#777"} background={"#ddd"}>
                  {sdgs.map(({ sdg, impacts }: any, i) => (
                    <Box>
                      <Flex
                        justifyContent="space-between"
                        color="#fff"
                        background={sdg?.color}
                        height={i === 0 ? 180 : 120}
                        borderLeft={{
                          base: `8px solid ${sdgs[0].sdg?.color}`,
                          md: `16px solid ${sdgs[0].sdg?.color}`,
                        }}
                        alignItems="center"
                        p={1}
                      >
                        <Flex alignItems="center" width={"200px"}>
                          <Image
                            src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`}
                            height={8}
                            mr={2}
                            ml={2}
                          />
                          <Text
                            fontFamily="Oswald"
                            fontWeight="600"
                            textTransform="uppercase"
                            textAlign="left"
                            maxWidth={40}
                            fontSize={{ base: "1.2em", md: "1.4em" }}
                            lineHeight={{ base: 1, md: 1.2 }}
                          >
                            {sdg.goal}
                          </Text>
                        </Flex>
                        <Stack flexGrow={1} mx={{ base: 3, md: 6 }}>
                          {impacts.map((impact) => (
                            <Box
                              backgroundColor="rgba(0,0,0,0.1)"
                              textAlign="center"
                              py={2}
                            >
                              <Text
                                fontFamily="Oswald"
                                fontWeight="600"
                                fontSize={{ base: "1.4em", md: "1.8em" }}
                                lineHeight={{ base: 1.2, md: 1.4 }}
                              >
                                {impact.value}
                              </Text>
                              <Text fontSize={{ base: "0.8em", md: "0.9em" }}>
                                {impact.indicator}
                              </Text>
                            </Box>
                          ))}
                        </Stack>
                      </Flex>
                    </Box>
                  ))}
                </Box>
                <Box height={240} p={4} color={"#777"} background={"#ccc"}>
                  Operations
                </Box>
                <Box height={240} p={4} color={"#777"} background={"#bbb"}>
                  Financial
                </Box>
              </Skeleton>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
