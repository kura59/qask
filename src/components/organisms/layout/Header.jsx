import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import Link from "next/link";
import MenuIconButton from "../../atoms/button/MenuIconButton";
import MenuDrawer from "../../molecules/MenuDrawer";
import { useRouter } from "next/router";
import LogoutIconButton from "../../atoms/button/LogoutIconButton";
import { client } from "../../../libs/supabase";
import { Auth } from "@supabase/ui";

const NAV_ITEMS = [{ href: "/Setting", label: "Setting" }];

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = Auth.useUser();

  const onClickTop = (e) => {
    e.preventDefault();
    router.push("/");
    onClose();
  };

  const onClickSetting = (e) => {
    e.preventDefault();
    router.push("/Setting");
    onClose();
  };
  const onClickLogout = (e) => {
    e.preventDefault();
    client.auth.signOut();
    router.push("/");
    onClose();
  };
  return (
    <>
      <Flex
        as="nav"
        bg="white"
        color="gray.500"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer", opacity: 0.6 }}
          onClick={onClickTop}
        >
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            fontFamily="BioRhyme"
          >
            Qask
          </Heading>
        </Flex>
        {user ? (
          <>
            <Flex
              align="center"
              fontSize="sm"
              flexGrow={2}
              display={{ base: "none", md: "flex" }}
            >
              {NAV_ITEMS.map((item) => {
                return (
                  <>
                    <Box pr={4} _hover={{ cursor: "pointer", opacity: 0.6 }}>
                      <Link key={item.href} href={item.href}>
                        <a>{item.label}</a>
                      </Link>
                    </Box>
                  </>
                );
              })}
            </Flex>
            <LogoutIconButton onClickLogout={onClickLogout} />
            <MenuIconButton onOpen={onOpen} />
          </>
        ) : null}
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickTop={onClickTop}
        onClickSetting={onClickSetting}
        onClickLogout={onClickLogout}
      />
    </>
  );
};
