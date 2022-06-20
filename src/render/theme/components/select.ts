export const Select = {
  baseStyle: {
    field: {
      //field에서 스타일을 넣어야 한다.
      bg: "transparent",
      minW: "180px",
      border: "1px solid",
      borderColor: "gray.300",
      borderRadius: "2px",
      fontSize: "14px",
      ":focus": {
        borderColor: "innodep.600 !important",
        bg: "transparent",
        boxShadow: "none",
      },
      "[data-hover]": {
        borderColor: "innodep.600",
        bg: "transparent",
      },
      ":hover": {
        borderColor: "innodep.600",
        bg: "transparent",
        boxShadow: "none",
      },
      ":placeholder": {
        bg: "transparent",
        borderColor: "whiteAlpha.400",
        boxShadow: "none",
      },
    },
  },
  sizes: {
    md: {
      field: {
        border: "1px solid",
        borderRadius: "2px",
        borderColor: "whiteAlpha.400",
        fontSize: "14px",
        ":focus": {
          borderColor: "innodep.600",
          bg: "transparent",
        },
        ":hover": {
          borderColor: "innodep.600",
          bg: "transparent",
        },
      },
    },
  },
};
