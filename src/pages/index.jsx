import { Box, Flex, Heading } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { client } from "../libs/supabase";
import React from "react";
// import Login from "./Login";
import Top from "./Top";

const Container = (props) => {
  const { user } = Auth.useUser();

  if (user) {
    return <Top />;
  }
  return <>{props.children}</>;
};

// export default function Home() {
//   return <Login />;
// }
export default function Home() {
  return (
    <Container>
      <Heading
        as="h1"
        bg="teal.500"
        color="gray.50"
        fontSize={{ base: "md", md: "lg" }}
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        Qask
      </Heading>
      <Flex justify="center" pt={8}>
        <Box w="sm">
          <Auth
            supabaseClient={client}
            providers={["github"]}
            socialColors={true}
          />
        </Box>
      </Flex>
    </Container>
  );
}
