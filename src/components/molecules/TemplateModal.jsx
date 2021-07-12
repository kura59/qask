import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TemplateModal = (props) => {
  const { isOpenTemplate, onCloseTemplate, title, where, what, why, how } =
    props;
  const [questionText, setQuestionText] = useState("");
  const [rowsText, setRowsText] = useState();

  useEffect(() => {
    const template = `${title}についての質問
${where ? where + "において\n" : ""}${what}
という問題に対する確認
${why ? "原因として\n" + why + "\nと考えられる" : "原因は不明"}
${
  how
    ? "そのため、\n" + how + "\nという解決策を考えている"
    : "解決策がわからない"
}`;
    setQuestionText(template);
    setRowsText(template.split("\n").length);
  }, [isOpenTemplate]);

  return (
    <Modal isOpen={isOpenTemplate} onClose={onCloseTemplate}>
      <ModalOverlay />
      <ModalContent pb={4} w="70%" maxW="" mx={30}>
        <ModalHeader>質問テンプレート</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pt={4}>
          <Textarea
            overflow="hidden"
            resize="none"
            value={questionText}
            onChange={(e) => {
              setQuestionText(e.target.value);
              setRowsText(e.target.value.split("\n").length);
            }}
            rows={rowsText}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TemplateModal;
