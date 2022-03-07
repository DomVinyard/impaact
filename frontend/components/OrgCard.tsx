import { Box, Flex, Stack, Text, Skeleton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import IOrg from "types/org";

const OrgCard = ({ org, loading }: { org: IOrg; loading?: boolean }) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Stack background={"ddd"}>
        <Flex>
          <Box
            backgroundImage={`url(https://picsum.photos/seed/${org.slug}/200/300)`}
            backgroundSize="cover"
            backgroundPosition={"center center"}
            minHeight={{ base: 32, md: 28 }}
            justifyContent="flex-end"
            width={"100%"}
            flex={2}
          />
          <Box
            backgroundImage={`/images/map_placeholder.png`}
            backgroundSize="cover"
            backgroundPosition={["center", "center"]}
            cursor={"pointer"}
            textAlign={"left"}
            flex={1}
          />
        </Flex>
        <Stack
          spacing={0}
          textAlign={"left"}
          paddingX={6}
          paddingBottom={2}
          color="black"
        >
          <Text fontSize="lg" fontWeight={"800"} textTransform={"uppercase"}>
            {org.name}
          </Text>
        </Stack>
      </Stack>
    </Skeleton>
  );
};

export default OrgCard;
