import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
import timeFromNow from "lib/timeFromNow";
import React, { FC } from "react";
import IOrg from "types/org";

interface IProps {
  org: IOrg;
}

const Org: FC<IProps> = ({ org }) => {
  const authorNode = () => {
    return (
      <Stack
        spacing={4}
        isInline
        alignItems="center"
        p={4}
        borderBottomWidth={1}
      >
        {/* <Avatar name={org.author.name} src={org.author.image} /> */}
        <Stack>
          {/* <Text fontWeight="bold">{org.author.name}</Text> */}
          {/* <Text>{timeFromNow(org.created_at)}</Text> */}
        </Stack>
      </Stack>
    );
  };

  const bodyNode = () => {
    return (
      <Text fontSize="md" p={4}>
        {org.body}
      </Text>
    );
  };

  return (
    <Box shadow="lg" rounded="lg">
      <Stack spacing={0}>
        {authorNode()}
        {bodyNode()}
      </Stack>
    </Box>
  );
};

export default Org;
