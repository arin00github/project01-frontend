type StyleInterpolation = StyleObject | ((options: StyleOptions) => StyleObject);

interface StyleOptions {
  theme: Theme;
  colorMode: "light" | "dark";
  colorScheme: string;
}

interface StyleConfig {
  baseStyle: StyleInterpolation;
  sizes: { [size: string]: StyleInterpolation };
  variants: { [variant: string]: StyleInterpolation };
  defaultProps?: {
    variant: string;
    size: string;
  };
}
