import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

//Toastを使用した、メッセージ表示のためのカスタムフック
export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback((props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  }, []);
  return { showMessage };
};
