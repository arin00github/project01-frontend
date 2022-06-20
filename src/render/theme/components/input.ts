export const Input = {
  //parts: ['field', 'group'],
  baseStyle: {
    field: {
      bg: "transparent",
      border: "1px solid",
      borderRadius: "2px", // <-- border radius is same for all variants and sizes
      fontSize: "14px",
      borderColor: "gray.300",
      _disabled: {
        borderColor: "gray.300",
        opacity: 1,
      },
      _placeholder: {
        color: "gray.400",
      },
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
  sizes: {
    md: {
      field: {
        bg: "transparent",
        border: "1px solid",
        borderRadius: "2px",
        borderColor: "gray.300",
        fontSize: "14px",
        _disabled: {
          borderColor: "gray.300",
          opacity: 1,
        },
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
    sm: {
      field: {
        border: "1px solid",
        borderRadius: "2px",
        borderColor: "gray.300",
        fontSize: "14px",
        _disabled: {
          borderColor: "gray.300",
          opacity: 1,
        },
        _focus: {
          borderColor: "innodep.600",
        },
        _hover: {
          borderColor: "innodep.600",
        },
      },
    },
  },
  defaultProps: {
    variant: null,
  },

  // defaultProps: { variant: 'custom' },
};
