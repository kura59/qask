import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";

export const QuestionCard = (props) => {
  const { question, onClick } = props;
  return (
    <Box
      w={{ base: "md", md: 250 }}
      h="90px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(question.id)}
    >
      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          {question.title}
        </Text>
        <Text fontSize="sm" color="gray">
          {question.when}
        </Text>
      </Stack>
    </Box>
  );
};
