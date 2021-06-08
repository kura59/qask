import { useDisclosure } from "@chakra-ui/hooks";
import { WrapItem } from "@chakra-ui/layout";
import { Wrap } from "@chakra-ui/layout";
import { useCallback } from "react";

import { QuestionCard } from "../components/organisms/question/QuestionCard";
import { QuestionDetailModal } from "../components/organisms/question/QuestionDetailModal";
import { HeaderLayout } from "../components/templates/HeaderLayout";

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickCard = useCallback(() => onOpen(), []);

  return (
    <>
      <HeaderLayout />
      <Wrap p={{ base: 4, md: 10 }}>
        <WrapItem>
          <QuestionCard
            question="question1"
            userName="kura59"
            onClick={onClickCard}
          />
        </WrapItem>
      </Wrap>
      <QuestionDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Board;
