import { Header } from "../organisms/layout/Header";

export const HeaderLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};
