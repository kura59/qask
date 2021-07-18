import { Button } from "@chakra-ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";

const MenuDrawer = (props) => {
  const { isOpen, onClose, onClickTop, onClickSetting, onClickLogout } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickTop}>
              Top
            </Button>
            <Button w="100%" onClick={onClickSetting}>
              Setting
            </Button>
            <Button w="100%" onClick={onClickLogout}>
              Sign out
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MenuDrawer;
