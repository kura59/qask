import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

const DeleteDialog = (props) => {
  const { isOpenAlert, onCloseAlert, onClickDelete } = props;
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
      isOpen={isOpenAlert}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>カードを削除しますか？</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          後でこのカードをもとに戻すことはできません。
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCloseAlert}>
            キャンセル
          </Button>
          <Button colorScheme="red" ml={3} onClick={onClickDelete}>
            削除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
