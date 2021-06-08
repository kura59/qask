import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";

export const QuestionCard = (props) => {
  const { question, userName, onClick } = props;
  return (
    <Box
      w="260px"
      h="90px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={onClick}
    >
      <Stack textAlign="center">
        {/* <Image
          borderRadius="full"
          boxSize="160px"
          src="https://source.unsplash.com/random"
          alt="プロフィール画像"
          m="auto"
        /> */}
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
