import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

const overrides = {
  fonts: {
    heading: '\'Hammersmith One\', sans-serif',
    body: '\'Inter\', sans-serif',
  },
  config,
  components: {},
};

const theme = extendTheme(overrides);

export default theme;