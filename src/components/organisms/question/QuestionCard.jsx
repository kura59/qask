import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";

export const QuestionCard = (props) => {
  const { id, question, userName, onClick } = props;
  return (
    <Box
      w="250px"
      h="90px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          {question}
        </Text>
        <Text fontSize="sm" color="gray">
          {userName}
        </Text>
      </Stack>
    </Box>
  );
};
