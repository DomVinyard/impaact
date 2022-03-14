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
import styled from "@emotion/styled";
import Content from "components/Content";
import SDGs from "lib/SDGs";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";
import { BsPeopleFill, BsCalendar2CheckFill } from "react-icons/bs";
import { FaFlag, FaCheck } from "react-icons/fa";

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

const Operations = ({ org }) => {
  return (
    <Flex
      width={"100%"}
      background={"#eee"}
      paddingX={2}
      paddingY={8}
      paddingBottm={10}
    >
      <Stack flex={1} alignItems="flex-start" justifyContent="center">
        <Link href={`/${org.slug}/operations`}>
          <Button variant="outline" ml={6} colorScheme="blue">
            View operations →
          </Button>
        </Link>
      </Stack>
      <Flex mr={6} flexGrow={1} mx={{ base: 2, md: 3 }} textAlign="center">
        <Stack flex={1}>
          <OpsTitle>Team size</OpsTitle>
          <Flex justifyContent="center">
            <BsPeopleFill size={30} />
          </Flex>
          <OpsMetric>{org.size}</OpsMetric>
        </Stack>
        <Stack flex={1}>
          <OpsTitle>Established</OpsTitle>
          <Flex justifyContent="center">
            <FaFlag size={30} />
          </Flex>
          <OpsMetric>{org.founded_at}</OpsMetric>
        </Stack>
        <Stack flex={1}>
          <OpsTitle>Policies</OpsTitle>
          <Flex justifyContent="center">
            <FaCheck size={30} />
          </Flex>
          <OpsMetric>Good</OpsMetric>
        </Stack>
      </Flex>
    </Flex>
  );
};

const OpsMetric = styled(Box)`
  font-size: 1.1rem;
  font-weight: bold;
`;

const OpsTitle = styled(Box)`
  font-size: 0.9rem;
`;

const OrgPageComponent = ({ org, loading }) => {
  const [session] = useSession();
  const [showMoreDescription, setShowMoreDescription] = React.useState(false);
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
  // console.log({ org });

  const topGoalColour = sdgs[0]?.sdg?.color || "#777";
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
  const mapHeight = isMobile ? 240 : 300;

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
                  <Box textAlign={"left"}>
                    <Box
                      fontSize={{ base: 21, md: 24 }}
                      lineHeight={1.3}
                      pt={4}
                    >
                      <Text>{org.description} </Text>

                      {org.long_description && (
                        <Box>
                          <Button
                            variant="ghost"
                            size="sm"
                            mt={3}
                            p={0}
                            onClick={() =>
                              setShowMoreDescription(!showMoreDescription)
                            }
                          >
                            {!showMoreDescription ? `Read more →` : `close`}
                          </Button>
                        </Box>
                      )}
                    </Box>
                    {org.long_description && showMoreDescription && (
                      <Box mt={4}>
                        <Text>{org.long_description}</Text>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>

              <Skeleton isLoaded={!loading}>
                <Flex height={{ base: "220px", md: "280px" }} color={"#777"}>
                  {org.geography && (
                    <Box
                      backgroundColor={`#aadafe`}
                      backgroundSize="cover"
                      backgroundPosition={["center", "center"]}
                      flex={1}
                      overflow={"hidden"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <StaticGoogleMap
                        size={`${mapWidth}x${mapHeight}`}
                        apiKey="AIzaSyAEsz877McL_8NQD7sRqiz420HjW4XHjIs"
                      >
                        {org.geography
                          ?.split(",")
                          .filter(Boolean)
                          .map((location) => (
                            <Marker
                              key={location}
                              size="normal"
                              location={location.trim()}
                              color={sdgs[0]?.sdg?.color.replace("#", "0x")}
                            />
                          ))}
                      </StaticGoogleMap>
                    </Box>
                  )}
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
                      <Box key={`sdg_${sdg.id}`}>
                        <Flex
                          justifyContent="space-between"
                          color="#fff"
                          background={sdg?.color}
                          minHeight={i === 0 ? 180 : 120}
                          borderLeft={sdgBorder}
                          alignItems="center"
                          py={{ base: 8, md: i === 0 ? 12 : 6 }}
                          px={{ base: 1, md: 4 }}
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
                                mr={2}
                              >
                                <Image
                                  src={`/images/sdg_trim/E-WEB-Goal-${sdg?.id}.png`}
                                  width={"100%"}
                                />
                              </Flex>
                              <Text
                                fontFamily="Oswald"
                                fontWeight="600"
                                textTransform="uppercase"
                                textAlign="left"
                                maxWidth={"150px"}
                                fontSize={
                                  i === 0
                                    ? { base: "1.3em", md: "1.6em" }
                                    : { base: "1em", md: "1.2em" }
                                }
                                lineHeight={{ base: 1, md: 1.2 }}
                              >
                                {sdg.goal}
                              </Text>
                            </Flex>
                            {i === 0 && (
                              <Box>
                                <Text opacity={0.8} pr={4} maxWidth="300px">
                                  {sdg.description}
                                </Text>
                                <Link href={`/${org.slug}/impact`}>
                                  <Button
                                    marginTop={{ base: 2, md: 4 }}
                                    width={{ base: 150, md: 200 }}
                                    variant="outline"
                                  >
                                    {isMobile
                                      ? `View data →`
                                      : "View impact data →"}
                                  </Button>
                                </Link>
                              </Box>
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
                                  key={`impact_${impact.id}`}
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
                  <Operations org={org} />
                </Stack>
                {org.link_financials && (
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
                    <Flex
                      width={"100%"}
                      background={"#eee"}
                      height={180}
                      backgroundImage={
                        "url(https://static.vecteezy.com/system/resources/previews/000/173/675/non_2x/spreadsheet-illustration-vector.jpg)"
                      }
                      backgroundPosition="top center"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <a href={org.link_financials} target="_blank">
                        <Button ml={9} color="white" variant="outline">
                          View financials →
                        </Button>
                      </a>
                    </Flex>
                  </Stack>
                )}
              </Skeleton>
            </Box>
          </Stack>
        </Content>
      </Box>
    </>
  );
};

export default OrgPageComponent;
