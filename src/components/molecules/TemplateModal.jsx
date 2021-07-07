import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TemplateModal = (props) => {
  const { isOpenTemplate, onCloseTemplate, title, where, what, why, how } =
    props;
  const [questionText, setQuestionText] = useState("");

  useEffect(() => {
    const template = `${title}についての質問
${where ? where + "において" : ""}${what}という問題に対する確認
${why ? "原因として" + why + "と考えられる" : "原因は不明"}
${
  how ? "そのため、" + how + "という解決策を考えている" : "解決策がわからない"
}`;
    setQuestionText(template);
  }, [isOpenTemplate]);

  return (
    <Modal isOpen={isOpenTemplate} onClose={onCloseTemplate}>
      <ModalOverlay />
      <ModalContent pb={4} w="70%" maxW="" mx={30}>
        <ModalHeader>質問テンプレート</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pt={4}>
          <TextareaAutosize
            style={{
              width: "100%",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
              resize: "none",
            }}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TemplateModal;
