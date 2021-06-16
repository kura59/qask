import { useDisclosure } from "@chakra-ui/hooks";
import { WrapItem, Wrap, Box, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import { useCallback, useReducer } from "react";

import { QuestionCard } from "../components/organisms/question/QuestionCard";
import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { useSelectQuestion } from "../hooks/useSelectQuestion";

// const initialState = [
//   {
//     id: 0,
//     title: "",
//     when: "",
//     where: "",
//     what: "",
//     why: "",
//     how: "",
//   },
// ];

// stateとactionを受け取り、actionのtypeによってstateの更新方法を変える
const reducer = (state, action) => {
  console.log("reducer実行");
  switch (action.type) {
    case "ADD":
      if (state) {
        console.log("state更新2回目以降");
        return [
          ...state,
          {
            id: state.slice(-1)[0].id + 1,
            title: action.title,
            when: action.when,
            where: action.where,
            what: action.what,
            why: action.why,
            how: action.how,
          },
        ];
      } else {
        console.log("state更新1回目");
        return [
          {
            id: 1,
            title: action.title,
            when: action.when,
            where: action.where,
            what: action.what,
            why: action.why,
            how: action.how,
          },
        ];
      }
  }
};

console.log("レンダリング外");

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectQuestion, selectedQuestion } = useSelectQuestion();
  const [questions, dispatch] = useReducer(reducer, null);

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

  console.log("レンダリング内");
  console.log(questions);

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
        {questions
          ? questions.map((question) => (
              <WrapItem key={question.id}>
                <QuestionCard
                  id={question.id}
                  title={question.title}
                  when={question.when}
                  onClick={onClickCard}
                />
              </WrapItem>
            ))
          : null}
      </Wrap>
      {/* <QuestionDetailModal isOpen={isOpen} onClose={onClose} /> */}
      <QuestionDetailModal
        question={selectedQuestion}
        isOpen={isOpen}
        onClose={onClose}
        dispatch={dispatch}
      />
    </>
  );
};

export default Board;
