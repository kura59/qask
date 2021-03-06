import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";

export const QuestionCard = (props) => {
  const { question, onClick } = props;
  return (
    <Box
      w={{ base: "80vw", md: "28vw" }}
      h="auto"
      bg="white"
      borderRadius="5px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.6 }}
      onClick={() => onClick(question.id, question.status)}
    >
      <Stack textAlign="center">
        <Text fontSize="md" fontWeight="bold">
          {question.title}
        </Text>
        <Text fontSize="sm" color="gray">
          {question.when}
        </Text>
      </Stack>
    </Box>
  );
};
