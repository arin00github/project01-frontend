/* eslint-disable */

import { extendTheme, type ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react";

import globalStyles from "./style";
import { commonColor } from "./foundation/colors";
import { breakpoints } from "./foundation/breakpoints";
import components from "./components";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const overrides = {
  config,
  colors: commonColor,
  styles: globalStyles,
  breakpoints,
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
  components,
};

const mainTheme = extendTheme(overrides, withDefaultColorScheme({ colorScheme: "innodep" }));

export default mainTheme;
