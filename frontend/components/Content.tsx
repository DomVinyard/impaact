import { Box } from "@chakra-ui/react";
import React from "react";

const Content: any = ({ isFull, ...others }) => {
  console.log({ isFull });
  return (
    <>
      <Box
        maxW="1200"
        mx="auto"
        w={{ base: isFull ? "100% !important" : "95%", md: "95%" }}
        px={{ base: isFull ? 0 : 2, md: 0 }}
        {...others}
      />
    </>
  );
};

export default Content;
