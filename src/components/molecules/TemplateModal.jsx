import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Textarea,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyTemplateButton from "../atoms/button/CopyTemplateButton";

const TemplateModal = (props) => {
  const {
    isOpenTemplate,
    onCloseTemplate,
    showMessage,
    title,
    where,
    what,
    why,
    how,
  } = props;
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

  const onCopyTemplate = () => {
    showMessage({
      title: "テキストがコピーされました！",
      status: "success",
    });
  };

  return (
    <Modal isOpen={isOpenTemplate} onClose={onCloseTemplate}>
      <ModalOverlay />
      <ModalContent pb={4} w="70%" maxW="" mx={30}>
        <ModalHeader>質問テンプレート</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pt={4}>
          <Flex mb={3} mr={2}>
            <Spacer />
            <Text color="gray.300" pr={2}>
              copy
            </Text>
            <CopyToClipboard text={questionText} onCopy={onCopyTemplate}>
              <CopyTemplateButton />
            </CopyToClipboard>
          </Flex>
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
