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

const OrgsPageComponent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box background="#E6F2F4">
      <Content isFull={isMobile} py={8}>
        <Stack spacing={8}>
          <Flex justifyContent={"center"}>
            <Image width={600} maxWidth={"80%"} src="images/pps.png" />
          </Flex>
          <Heading textAlign={{ base: "center", md: "left" }}>
            About PPS
          </Heading>
          <Text>
            We are delighted to share the Philanthropic Performance Statement.
          </Text>
          <Text>
            This report is in fact a prototype of what philanthropic reporting
            could look like. Our aim is to test, iterate, develop this
            philanthropic performance tool into an end-user centric, digital
            product that could enhance the accountability, trust and impact of
            philanthropy globally. PPS builds on the work of Insaan, and its
            partners and experts across the globe, on the Code of Practice for
            Non-Profits, developed and published with the support of Insaan
            donors and first launched as an idea at President Macron’s Paris
            Peace Forum in 2018.
          </Text>
          <Text>
            PPS, and the work of Insaan presented here, is clearly situated
            within the zeitgeist or spirit of our era as it touches upon three
            macro shifts: a re-imagining of shared values in the pursuit of
            profit; shared goals to steer this effort globally; and a shared
            wealth, a more impactful philanthropy to build this more inclusive
            world.
          </Text>
          <Text>
            <Heading>Shared Values</Heading>
            The post-Covid world is indeed in motion. A world where ‘shareholder
            capitalism’ is mutating into ‘stakeholder capitalism’, where
            shareholders, along with employees, customers, suppliers and
            communities they impact, are becoming part of a new global
            value-creation paradigm for all. This new paradigm is often referred
            to as ‘Profit, People, Planet and Institutions’ – a new dashboard
            for future-proofing companies in a fragile era of ‘increased
            connectivity’¹.
          </Text>
          <Text>
            <Heading>Shared Goals</Heading>
            At the global level, the dashboard for future-proofing our world, in
            line with these shared values, is the Sustainable Development Goals
            (UN SDGs), and their newly released Impact Standards. The 17 SDG
            Goals are ambitious from ending poverty to providing universal
            education and addressing climate change. The SDG Impact Standards,
            to ensure that we are all advancing towards these goals, build on
            and work in synergy with a plethora of frameworks (IMP), indicators
            (IRIS+) and best practices (IFC) – most of which inform this Annual
            Report 2020 to enhance the quality of our own reporting. The UN
            estimates that to meet the SDGs, some 5-7 trillion dollars will be
            needed. We are not there yet. But the system-change has begun.
          </Text>
          <Text>
            <Heading>Shared Wealth</Heading>
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
            fragmentation⁴.
          </Text>
        </Stack>
      </Content>
    </Box>
  );
};

export default OrgsPageComponent;
