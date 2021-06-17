import { useCallback, useState } from "react";

//選択した質問情報を特定し、モーダルを表示するカスタムフック
export const useSelectQuestion = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const onSelectQuestion = useCallback((props) => {
    const { id, questions, onOpen } = props;
    if (id === 0) {
      setSelectedQuestion(null);
    } else {
      const targetQuestion = questions.find((question) => question.id === id);
      setSelectedQuestion(targetQuestion);
    }
    onOpen();
  }, []);
  return { onSelectQuestion, selectedQuestion };
};
