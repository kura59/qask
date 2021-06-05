import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export default function Home() {
  return (
    <Box>
      <HeaderLayout />
      <Heading>Hello World!</Heading>
      <Button colorScheme="teal">ボタン</Button>
    </Box>
  );
}
