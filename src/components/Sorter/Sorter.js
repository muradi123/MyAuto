import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { changeSortTitle } from "../../redux/slices/commands";
import downArrow from "../assets/downArrow.png";

const SorterContainer = tw.div`
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
    border-black
    rounded-lg
    cursor-pointer
    bg-[#fff]
`;

const SorterItem = tw.div`
    flex
    items-center
    justify-between
    py-2.5
    gap-5
    px-5
    cursor-pointer
    bg-[#fff]
`;

const AdditionalSortItems = tw.div`
    absolute
    w-full
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
      <SorterTitle onClick={changeActive}>
        {sorterTitle}{" "}
        <img className='w-5 h-5 pointer-events-none' src={downArrow} />
      </SorterTitle>
      <AdditionalSortItems>
        {active &&
          sorters.map((item) => {
            return <SorterItem onClick={changeActive}>{item}</SorterItem>;
          })}
      </AdditionalSortItems>
    </SorterContainer>
  );
};

export default SorterSection;
