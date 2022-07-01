import { Box } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";

type BodyFrameProps = {
  children: ReactNode;
};

export const BodyFrame = ({ children }: BodyFrameProps) => {
  return (
    <Box px="40px" pt={8}>
      <Box w="100%" h="calc(100vh - 180px)">
        {children}
      </Box>
    </Box>
  );
};
