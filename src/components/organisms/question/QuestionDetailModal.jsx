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
    detail,
    setDetail,
    row,
    setRow,
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
      setDetail((prevDetail) => {
        return {
          ...prevDetail,
          title: question.title,
          when: question.when,
          what: question.what,
          who: question.who,
          task: question.task,
          done: question.done,
          image: question.image,
          hope: question.hope,
          memo: question.memo,
          status: question.status,
        };
      });
      setRow((prevRow) => {
        return {
          ...prevRow,
          rowsWhat:
            question.what.split("\n").length > 3
              ? question.what.split("\n").length
              : 3,
          rowsTask:
            question.task.split("\n").length > 3
              ? question.task.split("\n").length
              : 3,
          rowsDone:
            question.done.split("\n").length > 3
              ? question.done.split("\n").length
              : 3,
          rowsImage:
            question.image.split("\n").length > 3
              ? question.image.split("\n").length
              : 3,
          rowsHope:
            question.hope.split("\n").length > 3
              ? question.hope.split("\n").length
              : 3,
          rowsMemo:
            question.memo.split("\n").length > 3
              ? question.memo.split("\n").length
              : 3,
        };
      });
    } else {
      setDetail((prevDetail) => {
        return {
          ...prevDetail,
          title: "",
          when: "",
          what: "",
          who: "",
          task: "",
          done: "",
          image: "",
          hope: "",
          memo: "",
          status: "1",
        };
      });
      setRow((prevRow) => {
        return {
          ...prevRow,
          rowsWhat: 3,
          rowsTask: 3,
          rowsDone: 3,
          rowsImage: 3,
          rowsHope: 3,
          rowsMemo: 3,
        };
      });
    }
  }, [question, isOpen]);

  const onClickTemplate = useCallback(() => {
    if (detail.title === "" || detail.what === "") {
      showMessage({
        title: "タイトルと発生した事象・問題（what）を入力してください。",
        status: "error",
      });
    } else {
      onOpenTemplate();
    }
  }, [detail.title, detail.what]);

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
            value={detail.title}
            onChange={(e) =>
              setDetail((prevDetail) => {
                return { ...prevDetail, title: e.target.value };
              })
            }
          />
        </ModalHeader>
        <ModalBody mx={4} overflowY="scroll">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>作成日（When）</FormLabel>
              <Input
                type="date"
                value={detail.when}
                onChange={(e) =>
                  setDetail((prevDetail) => {
                    return { ...prevDetail, when: e.target.value };
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>担当者（Who）</FormLabel>
              <Input
                value={detail.who}
                onChange={(e) =>
                  setDetail((prevDetail) => {
                    return { ...prevDetail, who: e.target.value };
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>発生した事象・問題（What）</FormLabel>
              <Textarea
                value={detail.what}
                onChange={(e) => onChangeRows(e.target.value, "what")}
                overflow="hidden"
                resize="none"
                rows={row.rowsWhat}
              />
            </FormControl>
            <FormControl>
              <FormLabel>必要な課題（Task）</FormLabel>
              <Textarea
                value={detail.task}
                onChange={(e) => onChangeRows(e.target.value, "task")}
                overflow="hidden"
                resize="none"
                rows={row.rowsTask}
              />
            </FormControl>
            <FormControl>
              <FormLabel>試したこと（done）</FormLabel>
              <Textarea
                value={detail.done}
                onChange={(e) => onChangeRows(e.target.value, "done")}
                overflow="hidden"
                resize="none"
                rows={row.rowsDone}
              />
            </FormControl>
            <FormControl>
              <FormLabel>問題に対する仮説（Image）</FormLabel>
              <Textarea
                value={detail.image}
                onChange={(e) => onChangeRows(e.target.value, "image")}
                overflow="hidden"
                resize="none"
                rows={row.rowsImage}
              />
            </FormControl>
            <FormControl>
              <FormLabel>質問相手に期待する内容（Hope）</FormLabel>
              <Textarea
                value={detail.hope}
                onChange={(e) => onChangeRows(e.target.value, "hope")}
                overflow="hidden"
                resize="none"
                rows={row.rowsHope}
              />
            </FormControl>
            <FormControl>
              <FormLabel>共有事項（memo）</FormLabel>
              <Textarea
                value={detail.memo}
                onChange={(e) => onChangeRows(e.target.value, "memo")}
                overflow="hidden"
                resize="none"
                rows={row.rowsMemo}
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
            value={detail.status}
            onChange={(e) =>
              setDetail((prevDetail) => {
                return { ...prevDetail, status: e.target.value };
              })
            }
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
        title={detail.title}
        what={detail.what}
        task={detail.task}
        done={detail.done}
        image={detail.image}
        hope={detail.hope}
        memo={detail.memo}
      />
    </Modal>
  );
};
