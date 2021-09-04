import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
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
import { useCallback, useEffect } from "react";
import PrimaryButton from "../../atoms/button/PrimaryButton";
import DeleteQuestionButton from "../../atoms/button/DeleteQuestionButton";
import DeleteDialog from "../../molecules/DeleteDialog";
import TemplateModal from "../../molecules/TemplateModal";
import { useMessage } from "../../../hooks/useMessage";
import { useCRUDQuestion } from "../../../hooks/useCRUDQuestion";

//質問カードクリック時に表示する、詳細情報入出力用のモーダルコンポーネント
export const QuestionDetailModal = (props) => {
  const {
    question,
    isOpen,
    onClose,
    dispatch,
    dispatchIn,
    dispatchSolved,
    questions,
    inQuestions,
    solvedQuestions,
    client,
  } = props;

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
    what,
    who,
    task,
    done,
    image,
    hope,
    memo,
    status,
    rowsWhat,
    rowsTask,
    rowsDone,
    rowsImage,
    rowsHope,
    rowsMemo,
    setTitle,
    setWhen,
    setWhat,
    setWho,
    setTask,
    setDone,
    setImage,
    setHope,
    setMemo,
    setStatus,
    setRowsWhat,
    setRowsTask,
    setRowsDone,
    setRowsImage,
    setRowsHope,
    setRowsMemo,
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
    onCloseAlert,
    showMessage,
    questions,
    inQuestions,
    solvedQuestions,
    client
  );

  // const { user } = Auth.useUser();

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setWhen(question.when);
      setWhat(question.what);
      setWho(question.who);
      setTask(question.task);
      setDone(question.done);
      setImage(question.image);
      setHope(question.hope);
      setMemo(question.memo);
      setStatus(question.status);
      setRowsWhat(
        question.what.split("\n").length > 3
          ? question.what.split("\n").length
          : 3
      );
      setRowsTask(
        question.task.split("\n").length > 3
          ? question.task.split("\n").length
          : 3
      );
      setRowsDone(
        question.done.split("\n").length > 3
          ? question.done.split("\n").length
          : 3
      );
      setRowsImage(
        question.image.split("\n").length > 3
          ? question.image.split("\n").length
          : 3
      );
      setRowsHope(
        question.hope.split("\n").length > 3
          ? question.hope.split("\n").length
          : 3
      );
      setRowsMemo(
        question.memo.split("\n").length > 3
          ? question.memo.split("\n").length
          : 3
      );
    } else {
      setTitle("");
      setWhen("");
      setWhat("");
      setWho("");
      setTask("");
      setDone("");
      setImage("");
      setHope("");
      setMemo("");
      setStatus("1");
      setRowsWhat(3);
      setRowsTask(3);
      setRowsDone(3);
      setRowsImage(3);
      setRowsHope(3);
      setRowsMemo(3);
    }
  }, [question, isOpen]);

  const onClickTemplate = useCallback(() => {
    if (title === "" || what === "") {
      showMessage({
        title: "タイトルと発生した事象・問題（what）を入力してください。",
        status: "error",
      });
    } else {
      onOpenTemplate();
    }
  }, [title, task]);

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
              <FormLabel>作成日（When）</FormLabel>
              <Input
                type="date"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>担当者（Who）</FormLabel>
              <Input value={who} onChange={(e) => setWho(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>発生した事象・問題（What）</FormLabel>
              <Textarea
                value={what}
                onChange={(e) => onChangeRows(e.target.value, "what")}
                overflow="hidden"
                resize="none"
                rows={rowsWhat}
              />
            </FormControl>
            <FormControl>
              <FormLabel>必要な課題（Task）</FormLabel>
              <Textarea
                value={task}
                onChange={(e) => onChangeRows(e.target.value, "task")}
                overflow="hidden"
                resize="none"
                rows={rowsTask}
              />
            </FormControl>
            <FormControl>
              <FormLabel>試したこと（done）</FormLabel>
              <Textarea
                value={done}
                onChange={(e) => onChangeRows(e.target.value, "done")}
                overflow="hidden"
                resize="none"
                rows={rowsDone}
              />
            </FormControl>
            <FormControl>
              <FormLabel>問題に対する仮説（Image）</FormLabel>
              <Textarea
                value={image}
                onChange={(e) => onChangeRows(e.target.value, "image")}
                overflow="hidden"
                resize="none"
                rows={rowsImage}
              />
            </FormControl>
            <FormControl>
              <FormLabel>質問相手に期待する内容（Hope）</FormLabel>
              <Textarea
                value={hope}
                onChange={(e) => onChangeRows(e.target.value, "hope")}
                overflow="hidden"
                resize="none"
                rows={rowsHope}
              />
            </FormControl>
            <FormControl>
              <FormLabel>共有事項（memo）</FormLabel>
              <Textarea
                value={memo}
                onChange={(e) => onChangeRows(e.target.value, "memo")}
                overflow="hidden"
                resize="none"
                rows={rowsMemo}
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
        what={what}
        task={task}
        done={done}
        image={image}
        hope={hope}
        memo={memo}
      />
    </Modal>
  );
};
