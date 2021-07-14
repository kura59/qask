import { IconButton } from "@chakra-ui/button";
import { CopyIcon } from "@chakra-ui/icons";

const CopyTemplateButton = (props) => {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="コピーボタン"
      icon={<CopyIcon />}
      size={{ base: "md", md: "lg" }}
      color="gray.400"
      variant="unstyled"
      onClick={onClick}
    />
  );
};

export default CopyTemplateButton;
