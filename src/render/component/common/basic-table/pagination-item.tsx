import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type PaginationProps = {
  handleClick: () => void;
  bgStandard: boolean;
  indexNumber: number;
};

export const PaginationItem = ({ handleClick, bgStandard, indexNumber }: PaginationProps & BoxProps): JSX.Element => {
  return (
    <Box
      w="28px"
      h="28px"
      bg={bgStandard ? "#1873DC" : "whiteAlpha.100"}
      textAlign="center"
      lineHeight="28px"
      borderRadius="50%"
      cursor="pointer"
      key={`pagination_${indexNumber}`}
      onClick={() => handleClick()}
    >
      {indexNumber + 1}
    </Box>
  );
};
