import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "black")(props),
      color: mode('black', 'white')(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
