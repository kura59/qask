import { Button } from "@chakra-ui/react";
import { IconLogOut } from "@supabase/ui";

const LogoutIconButton = (props) => {
  const { onClickLogout } = props;
  return (
    <Button
      aria-label="ログアウトボタン"
      icon={<IconLogOut />}
      size="sm"
      variant="unstyled"
      display={{ base: "none", md: "block" }}
      _hover={{ cursor: "pointer", opacity: 0.6 }}
      onClick={onClickLogout}
    >
      Sign Out
    </Button>
  );
};

export default LogoutIconButton;
