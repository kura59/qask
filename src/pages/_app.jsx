import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";

import { LayoutWrapper } from "../components/templates/LayoutWrapper";
import { client } from "../libs/supabase";
import theme from "../styles/theme";
import Login from "./Login";

const Container = (props) => {
  const { user } = Auth.useUser();

  if (user) {
    return <>{props.children}</>;
  }
  return <Login />;
};

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={client}>
      <ChakraProvider theme={theme}>
        <LayoutWrapper>
          <Container>
            <Component {...pageProps} />
          </Container>
        </LayoutWrapper>
      </ChakraProvider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
