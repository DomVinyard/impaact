import {
  Box,
  Flex,
  useBreakpointValue,
  GridItem,
  Select,
  ButtonGroup,
  Button,
  IconButton,
} from "@chakra-ui/react";
import OrgsList from "components/OrgsList";
import {
  useFetchLatestQuery,
  useFetchFeaturedQuery,
  useMyOrgsQuery,
} from "generated-graphql";
import React, { useState } from "react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { session } from "next-auth/client";
import { useSession } from "next-auth/client";

type TabIDs = "featured" | "latest" | "yours";
type tab = {
  id: TabIDs;
  label: string;
  isSelected: boolean;
};

const Controls = ({ tabs, handleSelectTab }) => {
  return (
    <>
      {/* Wide */}
      <Flex
        display={{ base: "none", md: "flex" }}
        marginTop={24}
        marginBottom={6}
      >
        <Box flexGrow={1}>
          <Link href="/orgs/add">
            <Button colorScheme="blue">Add organisation</Button>
          </Link>
          <Link href="/orgs">
            <Button colorScheme="gray" ml={2} color="gray" variant="ghost">
              Your organisations →
            </Button>
          </Link>
        </Box>
        <Box>
          <Select
            onChange={(e) => handleSelectTab(e.target.value)}
            borderColor={"#ccc"}
            variant="outline"
            size="md"
            minWidth={200}
          >
            {tabs.map((tab) => (
              <option
                style={{ margin: "16px" }}
                key={tab.id + "wide"}
                value={tab.id}
              >
                {tab.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box ml={2}>
          <ButtonGroup size="md" isAttached variant="outline">
            <IconButton
              size="md"
              variant="outline"
              mr="-px"
              aria-label="Grid"
              isActive={true}
              icon={<BsGridFill />}
            />
            <IconButton
              // onClick={() => alert("List view not implemented yet")}
              size="md"
              variant="outline"
              aria-label="List"
              icon={<FaThList />}
            />
          </ButtonGroup>
        </Box>
      </Flex>

      {/* Mobile */}
      <Flex
        fontSize={19}
        display={{ base: "flex", md: "none" }}
        background={"#aaa"}
        borderBottom={"4px solid #eee"}
        fontWeight={300}
      >
        {tabs.map((tab) => (
          <Box
            onClick={() => handleSelectTab(tab.id)}
            background={tab.isSelected ? "#eee" : "#ddd"}
            margin={0}
            mb={0}
            opacity={tab.isSelected ? 1 : 0.4}
            py={6}
            flex={1}
            key={tab.id}
            textAlign={"center"}
          >
            {tab.label}
          </Box>
        ))}
      </Flex>
    </>
  );
};

const PopularComponent = () => {
  const [selected, setSelected] = useState<TabIDs>("featured");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const top = useBreakpointValue({ base: 5, md: 9, lg: 11 });

  const [session] = useSession();

  const emptyList = Array.apply(null, Array(top)).map(() => ({}));
  const {
    data: featured_data,
    error: featured_error,
    loading: featured_loading,
  } = useFetchFeaturedQuery({
    variables: { top },
  });
  const {
    data: latest_data,
    error: latest_error,
    loading: latest_loading,
  } = useFetchLatestQuery({
    variables: { top },
  });
  // const {
  //   data: yours_data,
  //   error: yours_error,
  //   loading: yours_loading,
  // } = useMyOrgsQuery({
  //   variables: { userId: session?.user?.id },
  // });
  const tabs: tab[] = [
    { label: "Featured", id: "featured", isSelected: selected === "featured" },
    { label: "Latest", id: "latest", isSelected: selected === "latest" },
  ];
  const handleSelectTab = (id) => setSelected(id);

  const data = selected === "featured" ? featured_data : latest_data;
  const error = selected === "featured" ? featured_error : latest_error;
  const loading = selected === "featured" ? featured_loading : latest_loading;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box pb={{ base: 0, md: 10 }}>
      <Controls tabs={tabs} handleSelectTab={handleSelectTab} />
      <OrgsList
        orgs={data?.orgs || emptyList}
        loading={loading}
        after={
          <GridItem rowSpan={1} colSpan={1}>
            <Link href={"/browse"}>
              <Flex
                height="100%"
                width={"100%"}
                cursor={"pointer"}
                alignItems={"center"}
                justifyContent={"center"}
                color="#444"
                fontWeight={800}
                backgroundImage={"url(images/cloud.png)"}
                backgroundSize={"cover"}
                backgroundPosition={"center center"}
              ></Flex>
            </Link>
          </GridItem>
        }
      />
    </Box>
  );
};

export default PopularComponent;
