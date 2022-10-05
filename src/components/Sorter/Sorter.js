import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { changeSortTitle } from "../../redux/slices/commands";
import downArrow from "../assets/downArrow.png";

const SorterContainer = tw.div`
    flex
    gap-4
`;

const FlexCoumn = tw.div`
    relative
    flex,
    flex-col
`;

const SorterTitle = tw.div`
    flex
    items-center
    justify-between
    py-2.5
    gap-5
    px-5
    border-[1px]
    border-[#E9E9F0]
    font-medium
    text-[#454857]
    rounded-lg
    cursor-pointer
    bg-[#fff]
    text-[12px]
`;

const SorterItem = tw.div`
    flex
    items-center
    justify-between
    text-[#6F7383]
    py-2.5
    gap-5
    px-5
    cursor-pointer
    bg-[#fff]
    text-[14px]
    rounded-lg
    hover:bg-[#F2F3F6] hover:text-[black] hover:font-bold
`;

const AdditionalSortItems = tw.div`
    absolute
    w-full
    shadow
`;

const SorterSection = () => {
  const sorters = useSelector((state) => state.commandSlice.sortfilter);
  const sorterTitle = useSelector((state) => state.commandSlice.sortTitle);
  const price = useSelector((state) => state.commandSlice.currency);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const changeActive = (e) => {
    setActive(!active);
    dispatch(changeSortTitle(e.target.innerText));
  };
  return (
    <SorterContainer>
      <SorterTitle className="hidden md:flex">
        ბოლო 3 საათი
        <img
          className='w-5 h-5 pointer-events-none w-[13px] h-[13px]'
          src={downArrow}
        />
      </SorterTitle>
      <FlexCoumn>
        <SorterTitle onClick={changeActive}>
          {sorterTitle}{" "}
          <img
            className='w-5 h-5 pointer-events-none w-[13px] h-[13px]'
            src={downArrow}
          />
        </SorterTitle>
        <AdditionalSortItems>
          {active &&
            sorters.map((item) => {
              return <SorterItem onClick={changeActive}>{item}</SorterItem>;
            })}
        </AdditionalSortItems>
      </FlexCoumn>
    </SorterContainer>
  );
};

export default SorterSection;
