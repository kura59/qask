import { Box, Flex } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { client } from "../libs/supabase";

const Login = () => {
  return (
    <Flex justify="center" pt={8}>
      <Box w="sm" p={3}>
        <Auth
          supabaseClient={client}
          providers={["github"]}
          socialColors={true}
        />
      </Box>
    </Flex>
  );
};

export default Login;
