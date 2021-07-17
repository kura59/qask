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
      onClick={onClickLogout}
    >
      Sign out
    </Button>
  );
};

export default LogoutIconButton;
