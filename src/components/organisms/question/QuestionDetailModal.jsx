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
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { useState } from "react";

export const QuestionDetailModal = (props) => {
  const { question, isOpen, onClose, dispatch } = props;
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");

  const onClickButton = () => {
    dispatch({
      type: "ADD",
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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
      // size={{ base: "450px", md: "aa" }}
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        {question ? ( //質問カードをクリックした際の詳細表示
          <>
            <ModalHeader mt={6}>
              <Input
                placeholder="タイトル"
                value={question.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>When（発生日時・期限）</FormLabel>
                  <Input
                    value={question.when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Where（発生ケース）</FormLabel>
                  <Input
                    value={question.where}
                    onChange={(e) => setWhere(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Who（担当者）</FormLabel>
                  <Input
                    value={question.who}
                    onChange={(e) => setWho(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>What（問題概要）</FormLabel>
                  <Input
                    value={question.what}
                    onChange={(e) => setWhat(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Why（発生原因）</FormLabel>
                  <Input
                    value={question.why}
                    onChange={(e) => setWhy(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>How（解決策）</FormLabel>
                  <Input
                    value={question.how}
                    onChange={(e) => setHow(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
          </>
        ) : (
          //「+ new question」クリック時の質問作成用モーダル表示
          <>
            <ModalHeader mt={6}>
              <Input
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>When（発生日時・期限）</FormLabel>
                  <Input
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Where（発生ケース）</FormLabel>
                  <Input
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Who（担当者）</FormLabel>
                  <Input value={who} onChange={(e) => setWho(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>What（問題概要）</FormLabel>
                  <Input
                    value={what}
                    onChange={(e) => setWhat(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Why（発生原因）</FormLabel>
                  <Input value={why} onChange={(e) => setWhy(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>How（解決策）</FormLabel>
                  <Input value={how} onChange={(e) => setHow(e.target.value)} />
                </FormControl>
                <Flex justify="flex-end">
                  <Button
                    w="100px"
                    bg="teal.400"
                    color="white"
                    _hover={{ opacity: 0.8 }}
                    disabled=""
                    onClick={onClickButton}
                  >
                    登録
                  </Button>
                </Flex>
              </Stack>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
