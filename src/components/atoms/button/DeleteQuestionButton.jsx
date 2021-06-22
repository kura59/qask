import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteQuestionButton = (props) => {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="削除ボタン"
      icon={<DeleteIcon />}
      size={{ base: "md", md: "lg" }}
      color="red.400"
      variant="unstyled"
      onClick={onClick}
    />
  );
};

export default DeleteQuestionButton;
