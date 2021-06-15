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
} from "@chakra-ui/modal";
import { useState } from "react";

export const QuestionDetailModal = (props) => {
  const { question, isOpen, onClose } = props;
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        {question ? ( //質問カードをクリックした際の詳細表示
          <>
            <ModalHeader>タイトル</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>When（発生日時・期限）</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Where（発生ケース）</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Who（担当者）</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>What（問題概要）</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>Why（発生原因）</FormLabel>
                  <Input />
                </FormControl>
                <FormControl>
                  <FormLabel>How（解決策）</FormLabel>
                  <Input />
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
              </Stack>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
