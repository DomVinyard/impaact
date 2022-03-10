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
  useBreakpointValue,
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
    <Flex
      justifyContent={"flex-end"}
      alignItems={"center"}
      pr={{ base: 3, md: 0 }}
    >
      <Link href={`/${router?.query.slug}/edit`}>
        <Button leftIcon={<EditIcon />} colorScheme="gray" w="120px" mt={3}>
          Update
        </Button>
      </Link>
    </Flex>
  );
};

const OrgPageComponent = ({ org, loading }) => {
  const [session] = useSession();
  const isMyOrg = session?.id === org?.author_id;
  const isMobile = useBreakpointValue({ base: true, md: false });
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

  const topGoalColour = sdgs[0].sdg?.color;
  const sdgBorder = {
    base: `8px solid ${topGoalColour}`,
    md: `16px solid ${topGoalColour}`,
  };

  const SectionHeading = ({ children }) => (
    <Text
      backgroundColor={topGoalColour}
      mt={12}
      color="#fff"
      display="inline-block"
      paddingY={2}
      paddingLeft={3}
      paddingRight={5}
      fontWeight={"bold"}
      fontSize={{ base: "1.2em", md: "1.4em" }}
    >
      {children}
    </Text>
  );
  const screenWidth =
    (typeof window !== "undefined" && window?.innerWidth) || 500;

  const mapWidth = isMobile ? screenWidth / 2 : 760 / 2;
  const mapHeight = 220;

  const RGBToBin = function (r, g, b) {
    var bin = (r << 16) | (g << 8) | b;
    return (function (h) {
      return new Array(25 - h.length).join("0") + h;
    })(bin.toString(2));
  };

  return (
    <>
      <Box textAlign={{ base: "center", md: "left" }} pb={{ base: 0, md: 160 }}>
        <Content isFull>
          <Stack>
            <Box maxW={760}>
              {isMyOrg && <MyOrgBar />}
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
                <Flex height={"200px"} color={"#777"}>
                  <Box
                    // backgroundImage={`/images/map_placeholder.png`}
                    backgroundSize="cover"
                    backgroundPosition={["center", "center"]}
                    flex={1}
                    overflow={"hidden"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {org.geography && (
                      <StaticGoogleMap
                        size={`${mapWidth}x${mapHeight}`}
                        apiKey="AIzaSyAEsz877McL_8NQD7sRqiz420HjW4XHjIs"
                      >
                        {org.geography
                          .split(",")
                          .filter(Boolean)
                          .map((location) => (
                            <Marker
                              size="normal"
                              location={location.trim()}
                              color={sdgs[0]?.sdg?.color.replace("#", "0x")}
                            />
                          ))}
                      </StaticGoogleMap>
                    )}
                  </Box>
                  <Box
                    backgroundImage={`url(${org.main_image})`}
                    backgroundSize="cover"
                    backgroundPosition={"center center"}
                    minHeight={{ base: 32, md: 28 }}
                    justifyContent="flex-end"
                    width={"100%"}
                    flex={1}
                  />
                </Flex>
                <Box color={"#777"} background={"#ddd"}>
                  {sdgs.map(({ sdg, impacts }: any, i) => {
                    const impactCount = i === 0 ? 3 : 1;
                    return (
                      <Box>
                        <Flex
                          justifyContent="space-between"
                          color="#fff"
                          background={sdg?.color}
                          minHeight={i === 0 ? 180 : 120}
                          borderLeft={sdgBorder}
                          alignItems="center"
                          p={1}
                          py={{ base: 8, md: 6 }}
                          textAlign="left"
                        >
                          <Stack flex={1} ml={2}>
                            <Flex
                              alignItems="center"
                              justifyContent="flex-start"
                            >
                              <Flex
                                width={{ base: "40px", md: "50px" }}
                                padding={1}
                                mr={1}
                              >
                                <Image
                                  src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`}
                                  width={"100%"}
                                  mr={2}
                                />
                              </Flex>
                              <Text
                                fontFamily="Oswald"
                                fontWeight="600"
                                textTransform="uppercase"
                                textAlign="left"
                                maxWidth={"140px"}
                                fontSize={{ base: "1.2em", md: "1.4em" }}
                                lineHeight={{ base: 1, md: 1.2 }}
                              >
                                {sdg.goal}
                              </Text>
                            </Flex>
                            {i === 0 && (
                              <Text opacity={0.8} pr={4}>
                                {sdg.description}
                              </Text>
                            )}
                            {!isMobile && (
                              <Text fontWeight="bold" paddingTop={3}>
                                Explore data →
                              </Text>
                            )}
                          </Stack>
                          <Stack
                            flex={1}
                            // flexGrow={1}
                            mx={{ base: 3, md: 6 }}
                            pl={{ base: 3, md: 6 }}
                            // width={"50%"}
                          >
                            {[...impacts]
                              .slice(0, impactCount)
                              .map((impact) => (
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
                                  <Text
                                    fontSize={{ base: "0.8em", md: "0.9em" }}
                                  >
                                    {impact.indicator}
                                  </Text>
                                </Box>
                              ))}
                          </Stack>
                        </Flex>
                      </Box>
                    );
                  })}
                </Box>
                <Stack
                  alignItems="flex-start"
                  height={240}
                  // p={4}
                  color={"#777"}
                  background={"#fff"}
                  borderLeft={sdgBorder}
                  spacing={0}
                >
                  <SectionHeading>Operations</SectionHeading>
                  <Box width={"100%"} background={"#eee"} height={180}></Box>
                </Stack>
                <Stack
                  alignItems="flex-start"
                  height={240}
                  // p={4}
                  color={"#777"}
                  background={"#fff"}
                  borderLeft={sdgBorder}
                  spacing={0}
                >
                  <SectionHeading>Financials</SectionHeading>
                  <Box width={"100%"} background={"#eee"} height={180}></Box>
                </Stack>
              </Skeleton>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
