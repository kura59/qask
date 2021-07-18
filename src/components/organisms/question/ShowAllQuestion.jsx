import { AddIcon } from "@chakra-ui/icons";
import { Box, HStack, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { QuestionCard } from "./QuestionCard";

const Container = (props) => {
  const { status, onClickCard } = props;

  switch (status) {
    case "New":
      return (
        <Box
          w={{ base: "80vw", md: "28vw" }}
          h="50px"
          bg="white"
          borderRadius="5px"
          borderTopWidth="3px"
          borderTopColor="gray.500"
          shadow="md"
          p={3}
          mb={{ base: 4, md: 4 }}
          _hover={{ cursor: "pointer", opacity: 0.6 }}
          onClick={() => onClickCard(0, "")}
        >
          {props.children}
        </Box>
      );
    case "In Question":
      return (
        <Box
          w={{ base: "80vw", md: "28vw" }}
          h="50px"
          bg="white"
          borderRadius="5px"
          borderTopWidth="3px"
          borderTopColor="blue.500"
          shadow="md"
          p={3}
          mb={{ base: 4, md: 4 }}
        >
          {props.children}
        </Box>
      );
    case "Solved":
      return (
        <Box
          w={{ base: "80vw", md: "28vw" }}
          h="50px"
          bg="white"
          borderRadius="5px"
          borderTopWidth="3px"
          borderTopColor="green.500"
          shadow="md"
          p={3}
          mb={{ base: 4, md: 4 }}
        >
          {props.children}
        </Box>
      );
  }
};

export const ShowAllQuestion = (props) => {
  const { onClickCard, questions, status } = props;

  return (
    <Box mr={5}>
      <Container status={status} onClickCard={onClickCard}>
        {status === "New" ? (
          <HStack align="center" justify="center">
            <AddIcon color="gray.500" boxSize={3} />
            <Text fontSize="md" color="gray.500">
              {status}
            </Text>
          </HStack>
        ) : (
          <Stack textAlign="center">
            <Text fontSize="md" color="gray.500">
              {status}
            </Text>
          </Stack>
        )}
      </Container>
      <Wrap
        flexDirection="column"
        w={{ base: "auto", md: "30vw" }}
        h={{ md: "80vh" }}
        overflowY={{ md: "auto" }}
        overflowX={{ md: "hidden" }}
        spacing={{ base: 4, md: "20px" }}
      >
        {questions
          ? questions.map((question) => (
              <WrapItem key={question.id}>
                <QuestionCard question={question} onClick={onClickCard} />
              </WrapItem>
            ))
          : null}
      </Wrap>
    </Box>
  );
};
