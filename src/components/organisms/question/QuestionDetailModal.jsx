import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Flex } from "@chakra-ui/layout";
import {
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalFooter,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Select, Spacer, Textarea, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../../atoms/button/PrimaryButton";
import DeleteQuestionButton from "../../atoms/button/DeleteQuestionButton";
import DeleteDialog from "../../molecules/DeleteDialog";
import TemplateModal from "../../molecules/TemplateModal";
import { useMessage } from "../../../hooks/useMessage";
import { useCRUDQuestion } from "../../../hooks/useCRUDQuestion";
// import { Auth } from "@supabase/ui";

export const QuestionDetailModal = (props) => {
  const { question, isOpen, onClose, dispatch, dispatchIn, dispatchSolved } =
    props;

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenTemplate,
    onOpen: onOpenTemplate,
    onClose: onCloseTemplate,
  } = useDisclosure();

  const { showMessage } = useMessage();

  const {
    title,
    when,
    where,
    who,
    what,
    why,
    how,
    status,
    rowsWhere,
    rowsWhat,
    rowsWhy,
    rowsHow,
    setTitle,
    setWhen,
    setWhere,
    setWho,
    setWhat,
    setWhy,
    setHow,
    setStatus,
    setRowsWhere,
    setRowsWhat,
    setRowsWhy,
    setRowsHow,
    onChangeRows,
    onClickCreate,
    onClickUpdate,
    onClickDelete,
  } = useCRUDQuestion(
    dispatch,
    dispatchIn,
    dispatchSolved,
    question,
    onClose,
    isOpen,
    onCloseAlert
  );

  // const { user } = Auth.useUser();

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setWhen(question.when);
      setWhere(question.where);
      setWho(question.who);
      setWhat(question.what);
      setWhy(question.why);
      setHow(question.how);
      setStatus(question.status);
      setRowsWhere(
        question.where.split("\n").length > 3
          ? question.where.split("\n").length
          : 3
      );
      setRowsWhat(
        question.what.split("\n").length > 3
          ? question.what.split("\n").length
          : 3
      );
      setRowsWhy(
        question.why.split("\n").length > 3
          ? question.why.split("\n").length
          : 3
      );
      setRowsHow(
        question.how.split("\n").length > 3
          ? question.how.split("\n").length
          : 3
      );
    } else {
      setTitle("");
      setWhen("");
      setWhere("");
      setWho("");
      setWhat("");
      setWhy("");
      setHow("");
      setStatus("1");
      setRowsWhere(3);
      setRowsWhat(3);
      setRowsWhy(3);
      setRowsHow(3);
    }
  }, [question, isOpen]);

  const onClickTemplate = useCallback(() => {
    if (title === "" || what === "") {
      showMessage({
        title: "タイトル・What（問題概要）を入力してください。",
        status: "error",
      });
    } else {
      onOpenTemplate();
    }
  }, [title, what]);

  const STATUS = [
    { code: "1", name: "New" },
    { code: "2", name: "In Question" },
    { code: "3", name: "Solved" },
  ];
  const options = STATUS.map((option) => (
    <option key={option.code} value={option.code}>
      {option.name}
    </option>
  ));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={4} h="inherit" w="100%" maxW="" mx={30} mt={10}>
        <ModalCloseButton />
        <ModalHeader mt={6}>
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalHeader>
        <ModalBody mx={4} overflowY="scroll">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>When（発生日時・期限）</FormLabel>
              <Input
                type="date"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Who（担当者）</FormLabel>
              <Input value={who} onChange={(e) => setWho(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Where（発生ケース）</FormLabel>
              <Textarea
                value={where}
                onChange={(e) => onChangeRows(e.target.value, "where")}
                overflow="hidden"
                resize="none"
                rows={rowsWhere}
              />
            </FormControl>
            <FormControl>
              <FormLabel>What（問題概要）</FormLabel>
              <Textarea
                value={what}
                onChange={(e) => onChangeRows(e.target.value, "what")}
                overflow="hidden"
                resize="none"
                rows={rowsWhat}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Why（発生原因）</FormLabel>
              <Textarea
                value={why}
                onChange={(e) => onChangeRows(e.target.value, "why")}
                overflow="hidden"
                resize="none"
                rows={rowsWhy}
              />
            </FormControl>
            <FormControl>
              <FormLabel>How（解決策）</FormLabel>
              <Textarea
                value={how}
                onChange={(e) => onChangeRows(e.target.value, "how")}
                overflow="hidden"
                resize="none"
                rows={rowsHow}
              />
            </FormControl>
          </Stack>
          <Button my={4} onClick={onClickTemplate}>
            質問テンプレート作成
          </Button>
        </ModalBody>
        <ModalFooter>
          {question ? <DeleteQuestionButton onClick={onOpenAlert} /> : null}
          <Spacer />
          <Select
            w={40}
            mr={{ base: 3, md: 5 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {options}
          </Select>
          {question ? ( //作成済み質問カードクリック時
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          ) : (
            //「+ new question」クリック時（質問作成用）
            <PrimaryButton onClick={onClickCreate}>作成</PrimaryButton>
          )}
        </ModalFooter>
      </ModalContent>
      <DeleteDialog
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        onClickDelete={onClickDelete}
      />
      <TemplateModal
        isOpenTemplate={isOpenTemplate}
        onCloseTemplate={onCloseTemplate}
        showMessage={showMessage}
        title={title}
        where={where}
        what={what}
        why={why}
        how={how}
      />
    </Modal>
  );
};
