import { useDisclosure } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import { useCallback, useEffect, useReducer } from "react";
import { Auth } from "@supabase/ui";

import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { ShowAllQuestion } from "../components/organisms/question/ShowAllQuestion";
import { useSelectQuestion } from "../hooks/useSelectQuestion";
import { QuestionReducer } from "../reducers/QuestionReducer";
import { client } from "../libs/supabase";

const Board = () => {
  const { user } = Auth.useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectQuestion, selectedQuestion } = useSelectQuestion();

  const [questions, dispatch] = useReducer(QuestionReducer, null);
  const [inQuestions, dispatchIn] = useReducer(QuestionReducer, null);
  const [solvedQuestions, dispatchSolved] = useReducer(QuestionReducer, null);

  const fetchQuestionsNew = useCallback(async () => {
    //ユーザーに紐づく質問（New）を取得
    const dataQuestionsNew = await client
      .from("question_new")
      .select("questions")
      .match({ user_id: user.id });
    //質問（New）が存在すれば、stateに設定する
    if (dataQuestionsNew.data.length !== 0) {
      dispatch({ type: "SELECT", data: dataQuestionsNew.data[0].questions });
    }
  }, []);
  const fetchQuestionsIn = useCallback(async () => {
    //ユーザーに紐づく質問（InQuestion）を取得
    const dataQuestionsIn = await client
      .from("question_in")
      .select("questions")
      .match({ user_id: user.id });
    //質問（InQuestion）が存在すれば、stateに設定する
    if (dataQuestionsIn.data.length !== 0) {
      dispatchIn({ type: "SELECT", data: dataQuestionsIn.data[0].questions });
    }
  }, []);
  const fetchQuestionsSolved = useCallback(async () => {
    //ユーザーに紐づく質問（solvedQuestion）を取得
    const dataQuestionsSolved = await client
      .from("question_solved")
      .select("questions")
      .match({ user_id: user.id });
    //質問（solvedQuestion）が存在すれば、stateに設定する
    if (dataQuestionsSolved.data.length !== 0) {
      dispatchSolved({
        type: "SELECT",
        data: dataQuestionsSolved.data[0].questions,
      });
    }
  }, []);

  //ユーザーに紐づく質問を参照し、questions,inQuestions,solvedQuestionsそれぞれのstateに設定
  useEffect(() => {
    fetchQuestionsNew();
    fetchQuestionsIn();
    fetchQuestionsSolved();
  }, [fetchQuestionsNew, fetchQuestionsIn, fetchQuestionsSolved]);

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
        questions={questions}
        inQuestions={inQuestions}
        solvedQuestions={solvedQuestions}
        client={client}
      />
    </>
  );
};

export default Board;
