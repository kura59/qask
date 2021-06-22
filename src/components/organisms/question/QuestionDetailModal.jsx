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
import { Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PrimaryButton from "../../atoms/button/PrimaryButton";

export const QuestionDetailModal = (props) => {
  const { question, isOpen, onClose, dispatch } = props;
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setWhen(question.when);
      setWhere(question.where);
      setWho(question.who);
      setWhat(question.what);
      setWhy(question.why);
      setHow(question.how);
    } else {
      setTitle("");
      setWhen("");
      setWhere("");
      setWho("");
      setWhat("");
      setWhy("");
      setHow("");
    }
  }, [question]);

  const onClickCreate = () => {
    dispatch({
      type: "CREATE",
      title: title,
      when: when,
      where: where,
      who: who,
      what: what,
      why: why,
      how: how,
      setTitle: setTitle,
      setWhen: setWhen,
      setWhere: setWhere,
      setWho: setWho,
      setWhat: setWhat,
      setWhy: setWhy,
      setHow: setHow,
    });
    onClose();
  };

  const onClickUpdate = () => {
    dispatch({
      type: "UPDATE",
      id: question.id,
      title: title,
      when: when,
      where: where,
      who: who,
      what: what,
      why: why,
      how: how,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6} h="inherit" w="100%" maxW="" mx={30}>
        <ModalHeader mt={6}>
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalHeader>
        <ModalCloseButton />
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
              <FormLabel>Where（発生ケース）</FormLabel>
              <Input value={where} onChange={(e) => setWhere(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Who（担当者）</FormLabel>
              <Input value={who} onChange={(e) => setWho(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>What（問題概要）</FormLabel>
              <Textarea
                value={what}
                onChange={(e) => setWhat(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Why（発生原因）</FormLabel>
              <Textarea value={why} onChange={(e) => setWhy(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>How（解決策）</FormLabel>
              <Textarea value={how} onChange={(e) => setHow(e.target.value)} />
            </FormControl>
          </Stack>
        </ModalBody>
        {question ? ( //作成済み質問カードクリック時
          <ModalFooter>
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          </ModalFooter>
        ) : (
          //「+ new question」クリック時（質問作成用）
          <ModalFooter>
            <PrimaryButton onClick={onClickCreate}>作成</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
