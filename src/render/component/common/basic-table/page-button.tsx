import { ButtonProps, Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PaginationProps = {
  symbol: ReactNode;
  disabled: boolean;
  handleClick: () => void;
};

export const PageButton = ({ handleClick, symbol, disabled, ...rest }: PaginationProps & ButtonProps): JSX.Element => {
  return (
    <Button
      size="xs"
      w="28px"
      h="28px"
      bg="trasparent"
      p={0}
      _hover={{ bg: "#1873DC", color: "white" }}
      textAlign="center"
      lineHeight="28px"
      borderRadius="50%"
      cursor="pointer"
      onClick={() => handleClick()}
      disabled={disabled}
      {...rest}
    >
      {symbol}
    </Button>
  );
};
