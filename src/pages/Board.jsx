import { useDisclosure } from "@chakra-ui/hooks";
import { WrapItem, Wrap, Box, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import { useCallback } from "react";

import { QuestionCard } from "../components/organisms/question/QuestionCard";
import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { useSelectQuestion } from "../hooks/useSelectQuestion";

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectQuestion, selectedQuestion } = useSelectQuestion();

  const onClickNewCard = useCallback(() => {
    onOpen();
  }, []);
  const onClickCard = useCallback((id) => {
    console.log(id);
    onOpen();
  }, []);
  // const onClickCard = useCallback((id) => {
  //   onSelectQuestion({ id, questions, onOpen });
  // }, [questions, onSelectQuestion, onOpen]);

  return (
    <>
      <HeaderLayout />
      <Wrap p={{ base: 4, md: 10 }} spacing="30px">
        <WrapItem>
          <Box
            w="250px"
            h="60px"
            bg="white"
            borderRadius="10px"
            shadow="md"
            p={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickNewCard}
          >
            <Stack textAlign="center">
              <Text fontSize="md" color="gray">
                + new question
              </Text>
            </Stack>
          </Box>
        </WrapItem>
        <WrapItem key="1">
          <QuestionCard
            id="1"
            question="question1"
            userName="kura59"
            onClick={onClickCard}
          />
        </WrapItem>
      </Wrap>
      {/* <QuestionDetailModal isOpen={isOpen} onClose={onClose} /> */}
      <QuestionDetailModal
        question={selectedQuestion}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Board;
