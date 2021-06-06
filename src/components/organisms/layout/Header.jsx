import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import Link from "next/link";
import MenuIconButton from "../../atoms/button/MenuIconButton";
import MenuDrawer from "../../molecules/MenuDrawer";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/UserManagement", label: "ユーザー一覧" },
  { href: "/Setting", label: "設定" },
];

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const onClickTop = (e) => {
    e.preventDefault();
    router.push("/Top");
  };
  const onClickUserManagement = (e) => {
    e.preventDefault();
    router.push("/UserManagement");
  };
  const onClickSetting = (e) => {
    e.preventDefault();
    router.push("/Setting");
  };
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickTop}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Qask
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          {NAV_ITEMS.map((item) => {
            return (
              <>
                <Box pr={4}>
                  <Link key={item.href} href={item.href}>
                    <a>{item.label}</a>
                  </Link>
                </Box>
              </>
            );
          })}
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickTop={onClickTop}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
};
