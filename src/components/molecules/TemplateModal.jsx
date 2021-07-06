import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React from "react";

const TemplateModal = (props) => {
  const {
    isOpenTemplate,
    onCloseTemplate,
    title,
    where,
    what,
    why,
    how,
    isCheck,
  } = props;

  return (
    <Modal isOpen={isOpenTemplate} onClose={onCloseTemplate}>
      <ModalOverlay />
      <ModalContent>
        {isCheck ? (
          <>
            <ModalHeader>質問テンプレート</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{title}についての質問</Text>
              {where ? <Text>{where}において</Text> : null}
              <Text>{what}という問題に対する確認</Text>
              {why ? (
                <Text>原因として{why}と考えられる</Text>
              ) : (
                <Text>原因は不明</Text>
              )}
              {how ? (
                <Text>そのため、{how}という解決策を考えている</Text>
              ) : (
                <Text>解決策がわからない</Text>
              )}
            </ModalBody>
          </>
        ) : (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              タイトル・What（問題概要）を入力してください。
            </AlertDescription>
            <ModalCloseButton />
          </Alert>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TemplateModal;
