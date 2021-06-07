import { WrapItem } from "@chakra-ui/layout";
import { Wrap } from "@chakra-ui/layout";
import { QuestionCard } from "../components/organisms/question/QuestionCard";
import { HeaderLayout } from "../components/templates/HeaderLayout";

const Board = () => {
  return (
    <>
      <HeaderLayout />
      <Wrap p={{ base: 4, md: 10 }}>
        <WrapItem>
          <QuestionCard question="question1" userName="kura59" />
        </WrapItem>
      </Wrap>
    </>
  );
};

export default Board;
