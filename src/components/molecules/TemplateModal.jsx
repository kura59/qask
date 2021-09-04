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

//質問テンプレート表示・編集用のモーダルコンポーネント
const TemplateModal = (props) => {
  const {
    isOpenTemplate,
    onCloseTemplate,
    showMessage,
    title,
    what,
    task,
    done,
    image,
    hope,
    memo,
  } = props;
  const [questionText, setQuestionText] = useState("");
  const [rowsText, setRowsText] = useState();

  useEffect(() => {
    const template = `${title}についての質問
以下の状況の為、
${hope ? hope : "○○について聞きたい"}

${what}
という問題が発生している
${
  task
    ? "それに対し以下の課題がある\n" + task
    : "それに対し必要な課題はわかっていない"
}
${done ? "以下を試してみた\n" + done : "何をしてみるべきかわからない"}
${image ? image + "\nと考えている" : ""}
`;
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
        <ModalHeader color="gray.500">質問テンプレート</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pt={4}>
          <Flex mb={3} mr={2}>
            <Spacer />
            <Text color="gray.400" pr={2}>
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
