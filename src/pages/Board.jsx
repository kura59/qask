import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from "@chakra-ui/icons";
import { WrapItem, Wrap, Flex, Box, Text } from "@chakra-ui/layout";
import { HStack, Stack } from "@chakra-ui/react";
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
      action.setStatus("1");
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
            status: action.status,
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
            status: action.status,
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
          q.status = action.status;
        }
      });
      return state_copy;
    case "DELETE":
      const newState = state.filter((q) => q.id !== action.id);
      if (newState.length !== 0) {
        return newState;
      } else {
        return null;
      }
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
      <Flex p={{ base: 4, md: 6 }} overflowX="auto">
        <Box mr={5}>
          <Box
            w={{ base: "80vw", md: "28vw" }}
            h="50px"
            bg="white"
            borderRadius="10px"
            borderTopWidth="3px"
            borderTopColor="gray.500"
            shadow="md"
            p={3}
            mb={{ base: 4, md: 4 }}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={() => onClickCard(0)}
          >
            <HStack align="center" justify="center">
              <AddIcon />
              <Text fontSize="md" color="gray">
                New
              </Text>
            </HStack>
          </Box>
          <Wrap
            // p={{ md: 2 }}
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
        <Box mr={5}>
          <Box
            w={{ base: "80vw", md: "28vw" }}
            h="50px"
            bg="white"
            borderRadius="10px"
            borderTopWidth="3px"
            borderTopColor="blue.500"
            shadow="md"
            p={3}
            mb={{ base: 4, md: 4 }}
            // _hover={{ cursor: "pointer", opacity: 0.8 }}
            // onClick={() => onClickCard(0)}
          >
            <Stack textAlign="center">
              <Text fontSize="md" color="gray">
                In Question
              </Text>
            </Stack>
          </Box>
          <Wrap
            // p={{ md: 2 }}
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
        <Box mr={5}>
          <Box
            w={{ base: "80vw", md: "28vw" }}
            h="50px"
            bg="white"
            borderRadius="10px"
            borderTopWidth="3px"
            borderTopColor="green.500"
            shadow="md"
            p={3}
            mb={{ base: 4, md: 4 }}
            // _hover={{ cursor: "pointer", opacity: 0.8 }}
            // onClick={() => onClickCard(0)}
          >
            <Stack textAlign="center">
              <Text fontSize="md" color="gray">
                Solved
              </Text>
            </Stack>
          </Box>
          <Wrap
            // p={{ md: 2 }}
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
      </Flex>
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
