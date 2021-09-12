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

  const fetchQuestions = useCallback(
    async (dbName) => {
      //ユーザーに紐づく質問（New/In/Solved）を取得
      const dataQuestions = await client
        .from(dbName)
        .select("questions")
        .match({ user_id: user.id });
      //質問（New/In/Solved）が存在すれば、stateに設定する
      if (dataQuestions.data.length !== 0) {
        switch (dbName) {
          case "question_new":
            dispatch({ type: "SELECT", data: dataQuestions.data[0].questions });
            break;
          case "question_in":
            dispatchIn({
              type: "SELECT",
              data: dataQuestions.data[0].questions,
            });
            break;
          case "question_solved":
            dispatchSolved({
              type: "SELECT",
              data: dataQuestions.data[0].questions,
            });
            break;
          default:
            break;
        }
      }
    },
    [user.id]
  );

  //ユーザーに紐づく質問を参照し、questions,inQuestions,solvedQuestionsそれぞれのstateに設定
  useEffect(() => {
    fetchQuestions("question_new");
    fetchQuestions("question_in");
    fetchQuestions("question_solved");
  }, [fetchQuestions]);

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
