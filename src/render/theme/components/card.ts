export const Card = {
  // The styles all Cards have in common
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.08)",
    //alignItems: "center",
    // gap: 6,
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: "xl",
      boxShadow: "xl",
    },
    smooth: {
      padding: 6,
      //borderRadius: "base",
      //boxShadow: "0 3px 12px rgba(0,0,0,0.09)",
    },
    transparent: {
      borderRadius: "base",
      boxShadow: "md",
    },
  },
  // The default variant value
  defaultProps: {
    variant: "smooth",
  },
};
