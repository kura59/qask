import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { client } from "../libs/supabase";

import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
