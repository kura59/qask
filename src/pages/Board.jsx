import { useDisclosure } from "@chakra-ui/hooks";
import { WrapItem, Wrap, Box, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import { useCallback, useReducer } from "react";

import { QuestionCard } from "../components/organisms/question/QuestionCard";
import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { HeaderLayout } from "../components/templates/HeaderLayout";
// import { useLoginUser } from "../hooks/useLoginUser";
import { useSelectQuestion } from "../hooks/useSelectQuestion";

// stateとactionを受け取り、actionのtypeによってstateの更新方法を変える
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      action.setTitle("");
      action.setWhen("");
      action.setWhere("");
      action.setWho("");
      action.setWhat("");
      action.setWhy("");
      action.setHow("");
      if (state) {
        return [
          ...state,
          {
            id: state.slice(-1)[0].id + 1,
            title: action.title,
            when: action.when,
            where: action.where,
            who: action.who,
            what: action.what,
            why: action.why,
            how: action.how,
          },
        ];
      } else {
        return [
          {
            id: 1,
            title: action.title,
            when: action.when,
            where: action.where,
            who: action.who,
            what: action.what,
            why: action.why,
            how: action.how,
          },
        ];
      }
    case "UPDATE":
      const state_copy = state.slice();
      state_copy.map((q) => {
        if (q.id === action.id) {
          q.title = action.title;
          q.when = action.when;
          q.where = action.where;
          q.who = action.who;
          q.what = action.what;
          q.why = action.why;
          q.how = action.how;
        }
      });
      return state_copy;
  }
};

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectQuestion, selectedQuestion } = useSelectQuestion();
  const [questions, dispatch] = useReducer(reducer, null);
  // const { loginUser } = useLoginUser();
  // console.log(loginUser);

  const onClickCard = useCallback(
    (id) => {
      onSelectQuestion({ id, questions, onOpen });
    },
    [questions, onSelectQuestion, onOpen]
  );

  return (
    <>
      <HeaderLayout />
      <Wrap p={{ base: 4, md: 10 }} spacing="30px">
        <WrapItem>
          <Box
            w={{ base: "100vw", md: 250 }}
            h="60px"
            bg="white"
            borderRadius="10px"
            shadow="md"
            p={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={() => onClickCard(0)}
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
                <QuestionCard question={question} onClick={onClickCard} />
              </WrapItem>
            ))
          : null}
      </Wrap>
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
