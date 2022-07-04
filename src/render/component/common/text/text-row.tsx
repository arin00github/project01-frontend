/* eslint-disable no-console */
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface textRowProps {
  rowWidth?: number | string;
  keyText: string;
  keyWidth?: number | string;
  valueWidth?: boolean;
  valueText?: ReactNode;
  children?: ReactNode;
  size?: string;
}

export const TextRow = (props: textRowProps): JSX.Element => {
  /* const heightValue = {
    base: "24px",
    "2xl": "30px",
    "3xl": "30px",
  }; */
  const checkSize = () => {
    if (props.size === "sm") {
      return "28px";
    } else if (props.size === "md") {
      return "35px";
    } else if (props.size === "lg") {
      return "44px";
    } else {
      return "35px";
    }
  };
  return (
    <Flex w={props.rowWidth ? props.rowWidth : "100%"}>
      <Box
        display="flex"
        w="100%"
        h={checkSize()}
        lineHeight={checkSize()}
        fontSize={{ base: "12px", "2xl": "13px" }}
        borderBottom="1px solid"
        borderBottomColor="gray.500"
      >
        <Box display="flex" w={props.keyWidth ? props.keyWidth : "185px"} fontWeight="bolder">
          {props.keyText}
        </Box>
        <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" w={props.valueWidth ? "70px" : ""}>
          {props.valueText}
          {props.children && <Box>{props.children}</Box>}
        </Text>
      </Box>
    </Flex>
  );
};
