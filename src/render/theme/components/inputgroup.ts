export const InputGroup = {
  // parts: ['input', 'group'],
  baseStyle: {
    border: "1px solid",
    borderRadius: "2px", // <-- border radius is same for all variants and sizes
    borderColor: "gray.500",
    fontSize: "14px",
    _placeholder: {
      color: "gray.300",
    },
    _disabled: {
      borderColor: "gray.300",
      opacity: 1,
    },
    _focus: {
      borderColor: "innodep.600",
    },
    _active: {
      borderColor: "innodep.600",
    },
  },
  sizes: {
    md: {
      border: "1px solid",
      borderRadius: "2px",
      _disabled: {
        borderColor: "gray.300",
        opacity: 1,
      },
    },
    sm: {
      border: "1px solid",
      borderColor: "gray.300",
    },
  },

  // defaultProps: { variant: 'custom' },
}; // defaultProps: { variant: 'custom' },
