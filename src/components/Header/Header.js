import React from "react";
import tw from "tailwind-styled-components";
import { InnerContainer } from "../Shared/Container/InnerContainer";

const HeaderContainer = tw.div`
    flex
    items-center
    justify-left
    h-20
    w-full
    bg-[#fff]
`;

const Logo = tw.div`
    flex
    items-center
    gap-1
    bg-[#FD4100]
    w-max
    rounded-full
    px-4
    py-1.5
`;

const MyAutoTiTle = tw.div`
    font-bold
    text-xl
    text-black
    bg-[#fff]
    rounded-full
    px-2
    py-1
`;

const DotGe = tw.div`
    text-white
    font-bold
    text-xl
`;

const Header = () => {
  return (
    <HeaderContainer>
      <InnerContainer>
        <Logo>
          <MyAutoTiTle>myauto</MyAutoTiTle>
          <DotGe>.ge</DotGe>
        </Logo>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;
