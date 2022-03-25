import { AddIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  Box,
  Image,
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

const copy = [
  {
    type: "paragraph",
    text: "This report is a prototype of what philanthropic reporting could look like. Our aim is to test, iterate, develop this philanthropic performance tool into an end-user centric, digital product that CAN enhance the accountability, trust and impact of philanthropy globally. PPS builds on the work of Insaan, and its partners and experts across the globe, on the Code of Practice for Non-Profits, developed and published with the support of Insaan donors and first launched as an idea at President Macron’s Paris Peace Forum in 2018.",
  },
  {
    type: "paragraph",
    text: "PPS, and the work of Insaan presented here, is clearly situated within the zeitgeist or spirit of our era as it touches upon three macro shifts: a re-imagining of shared values in the pursuit of profit; shared goals to steer this effort globally; and a shared wealth, a more impactful philanthropy to build this more inclusive world.",
  },

  { type: "title", text: "Shared values" },
  {
    type: "paragraph",
    text: "The post-Covid world is indeed in motion. A world where ‘shareholder capitalism’ is mutating into ‘stakeholder capitalism’, where shareholders, along with employees, customers, suppliers and communities they impact, are becoming part of a new global value-creation paradigm for all. This new paradigm is often referred to as ‘Profit, People, Planet and Institutions’ – a new dashboard for future-proofing companies in a fragile era of ‘increased connectivity’¹.",
  },
  { type: "title", text: "Shared goals" },
  {
    type: "paragraph",
    text: `
            The post-Covid world is indeed in motion. A world where ‘shareholder
            capitalism’ is mutating into ‘stakeholder capitalism’, where
            shareholders, along with employees, customers, suppliers and
            communities they impact, are becoming part of a new global
            value-creation paradigm for all. This new paradigm is often referred
            to as ‘Profit, People, Planet and Institutions’ – a new dashboard
            for future-proofing companies in a fragile era of ‘increased
            connectivity’¹.`,
  },
  { type: "title", text: "Shared wealth" },
  {
    type: "paragraph",
    text: `
            Part of the solution to meet the SDGs lies in the global
            philanthropy sector estimated at 1.5 trillion dollars by UBS, who
            manages the wealth of 50% of the world’s billionaires². This global
            philanthropic giving is projected to continue to grow given the
            exponential increase in global wealth as 1% of the world’s
            population owns 44% of the world’s wealth, pre-Covid, according to
            the World Economic Forum – and that share of wealth is expected to
            rise post-Covid³. And yet, global philanthropy also needs a
            renovation given its trust deficit, lack of transparency,
            questionable impact, poor collaboration and persistent high
            fragmentation⁴.`,
  },
];

const OrgsPageComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Flex
        alignItems={"flex-end"}
        background="#E6F2F4"
        height={{ base: "50vh", md: "calc(100vh - 64px)" }}
      >
        <Content isFull={isMobile}>
          <Flex
            justifyContent={"center"}
            overflow="hidden"
            alignItems={"flex-end"}
          >
            <Image
              maxHeight={"100%"}
              maxWidth={"100%"}
              src="images/pps.png"
              mb={-1}
            />
          </Flex>
        </Content>
      </Flex>
      <Flex
        background="linear-gradient(180deg, rgba(66,66,66,1) 0%, rgba(6,13,32,1) 100%)"
        color="#fff"
        py={{ base: 16, md: 128 }}
      >
        <Content isFull={isMobile}>
          <Flex justifyContent={"center"} px={{ base: 12, md: 0 }}>
            <Box maxW={680}>
              {copy.map(({ type, text }) => {
                if (type === "title") {
                  return (
                    <Heading
                      fontFamily="Oswald"
                      mt={16}
                      mb={2}
                      fontSize={{ base: "xl", md: "3xl" }}
                    >
                      {text}
                    </Heading>
                  );
                }
                if (type === "paragraph") {
                  return (
                    <Text
                      fontFamily={"Roboto Slab"}
                      fontSize={"xl"}
                      fontWeight={500}
                      mt={5}
                      textAlign="justify"
                    >
                      {text}
                    </Text>
                  );
                }
              })}
            </Box>
          </Flex>
        </Content>
      </Flex>
    </>
  );
};

export default OrgsPageComponent;
