import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import { useCallback, useEffect, useReducer } from "react";
// import { Auth } from "@supabase/ui";

import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { ShowAllQuestion } from "../components/organisms/question/ShowAllQuestion";
import { useSelectQuestion } from "../hooks/useSelectQuestion";
import { QuestionReducer } from "../reducers/QuestionReducer";
// import { client } from "../libs/supabase";

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectQuestion, selectedQuestion } = useSelectQuestion();

  const [questions, dispatch] = useReducer(QuestionReducer, null);
  const [inQuestions, dispatchIn] = useReducer(QuestionReducer, null);
  const [solvedQuestions, dispatchSolved] = useReducer(QuestionReducer, null);

  // const fetchQuestionsNew = useCallback(async () => {
  //   const { dataQuestionsNew, error } = await client
  //     .from("question_new")
  //     .select("questions");
  //   console.log(dataQuestionsNew);
  //   if (!error && dataQuestionsNew) {
  //     dispatch({ type: "SELECT", data: dataQuestionsNew });
  //   }
  // }, []);
  // const fetchQuestionsIn = useCallback(async () => {
  //   const { dataQuestionsIn, error } = await client
  //     .from("question_in")
  //     .select("questions");
  //   if (!error && dataQuestionsIn) {
  //     dispatch({ type: "SELECT", data: dataQuestionsIn });
  //   }
  // }, []);
  // const fetchQuestionsSolved = useCallback(async () => {
  //   const { dataQuestionsSolved, error } = await client
  //     .from("question_solved")
  //     .select("questions");
  //   if (!error && dataQuestionsSolved) {
  //     dispatch({ type: "SELECT", data: dataQuestionsSolved });
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchQuestionsNew();
  //   fetchQuestionsIn();
  //   fetchQuestionsSolved();
  // }, [fetchQuestionsNew, fetchQuestionsIn, fetchQuestionsSolved]);

  const onClickCard = useCallback(
    (id, status) => {
      switch (status) {
        case "1":
          onSelectQuestion({ id, questions: questions, onOpen });
          break;
        case "2":
          onSelectQuestion({ id, questions: inQuestions, onOpen });
          break;
        case "3":
          onSelectQuestion({ id, questions: solvedQuestions, onOpen });
          break;
        default:
          onSelectQuestion({ id, questions: questions, onOpen });
          break;
      }
    },
    [questions, inQuestions, solvedQuestions, onSelectQuestion, onOpen]
  );

  return (
    <>
      <Flex p={{ base: 4, md: 6 }} overflowX="auto">
        <ShowAllQuestion
          onClickCard={onClickCard}
          questions={questions}
          status="New"
        />
        <ShowAllQuestion
          onClickCard={onClickCard}
          questions={inQuestions}
          status="In Question"
        />
        <ShowAllQuestion
          onClickCard={onClickCard}
          questions={solvedQuestions}
          status="Solved"
        />
      </Flex>
      <QuestionDetailModal
        question={selectedQuestion}
        isOpen={isOpen}
        onClose={onClose}
        dispatch={dispatch}
        dispatchIn={dispatchIn}
        dispatchSolved={dispatchSolved}
      />
    </>
  );
};

export default Board;
