import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const globalCustomStyles = {
  global: (props: StyleFunctionProps) => {
    return {
      "html, body": {
        padding: 0,
        margin: 0,
        backgroud: mode("#ffffff", "bg.aside")(props),
        fontFamily: "Noto Sans KR, sans-serif, Arial",
        fontSize: "15px",
        fontWeight: 300,
        color: mode("bg.aside", "gray.50")(props),
      },
    };
  },
};

export default globalCustomStyles;
