import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import downArrow from "../assets/downArrow.png";
import {
  changeCurrency,
  updateSearcher,
  getMaxPrice,
  getMinPrice,
  formSubmit,
} from "../../redux/slices/commands";
import headerIcon1 from "../assets/headerIcon1.png";
import headerIcon2 from "../assets/headerIcon2.png";
import headerIcon3 from "../assets/headerIcon3.png";

const Title = tw.div`
   flex
   text-xs
   items-center
   gap-3
   text-[#6F7383]
   mt-8
   mb-5
`;

const Form = tw.form`
   relative
   overflow-hidden
   flex
   flex-col
   shadow
   gap-3
   w-full
   bg-[#fff]
   py-5
   px-5
   rounded-t-lg
`;

const Arrow = tw.div`
   w-[6px]
   h-[6px]
   border-t-2
   border-r-2
   rotate-45
   border-[#6F7383] 
`;

const SearchItem = tw.div`
   flex
   flex-col
   gap-4
`;

const Label = tw.div`
   text-[#272A37]
   text-[12px]
`;

const Searcher = tw.div`
   flex
   items-center
   text-[13px]
   justify-between
   py-2.5
   px-5
   border-[1px]
   border-black
   rounded-lg
   cursor-pointer
`;

const AditionalItem = tw.div`
   py-2.5
   px-5
   text-[13px]
`;

const Headeritem1 = tw.div`
   flex
   items-center 
   justify-center
   h-[48px]
   cursor-pointer
   border-b-[1px]
   border-b-[#FD4100]
   w-full
`

const Headeritem2 = tw.div`
   flex
   items-center 
   justify-center
   cursor-pointer
   h-[48px]
   border-b-[1px]
   border-b-[#E9E9F0]
   w-full
`

const HeaderitemCenter = tw.div`
   flex 
   items-center 
   justify-center
   cursor-pointer
   h-[48px]
   border-black
   border-l-[1px]
   border-r-[1px]
   border-b-[1px]
   border-[#E9E9F0]
   w-full
`

const AditionalPannel = tw.div`
   border-2
   rounded-lg
   cursor-pointer
   overflow-y-auto
   max-h-60
`;

const CurrencyContainer = tw.div`
   flex
   items-center
   justify-center
   padding-[2px, 2px]
   border-2
   rounded-full
   cursor-pointer
`;

const LineHr = tw.div` 
   w-[120%]
   h-[1px]
   mt-[10px]
   mx-[-20px]
   bg-[#E9E9F0]
`;

const Currency = tw.div`
   flex
   items-center
   justify-center
   text-[13px]
   padding-[2px, 2px]
   rounded-full
   w-8
   h-8
   text-[#8C929B]
   cursor-pointer
`;

const PriceInput = tw.input`
   flex
   items-center
   justify-center
   text-[13px]
   py-2.5
   px-1
   border-2
   rounded-lg
`;

const Line = tw.span`
   flex
   items-center
   justify-center
   w-[10px]
`;

const Button = tw.input`
   py-2.5
   px-8
   mt-4
   bg-[#FD4100]
   text-[#fff]
   font-semibold
   rounded-lg
   cursor-pointer
`;

const SearchForm = () => {
  const items = useSelector((state) => state.commandSlice.searchers);
  const currency = useSelector((state) => state.commandSlice.currency);
  const minPrice = useSelector((state) => state.commandSlice.minPrice);
  const maxPrice = useSelector((state) => state.commandSlice.maxPrice);
  const dispatch = useDispatch();

  const updateFieldChanged = (index) => (event) => {
    const newState = [...items];
    newState[index] = {
      ...items[index],
      text: event.target.innerText,
      active: !items[index].active,
    };
    dispatch(updateSearcher(newState));
  };

  const currenySwitcher = (index) => (event) => {
    dispatch(changeCurrency([index, event]));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(formSubmit());
  };

  return (
    <div>
      <Title>
        მთავარი <Arrow></Arrow> ძიება <Arrow></Arrow>
        <span className='text-[#FD4100]'>იყიდება</span>
      </Title>
      <Form onSubmit={onSubmitHandler}>
        <div className='flex justify-between mt-[-20px] ml-[-18px] mr-[-18px]'>
          <Headeritem1 className='flex items-center justify-center'>
            <img src={headerIcon1} />
          </Headeritem1>
          <HeaderitemCenter className='flex items-center justify-center'>
            <img src={headerIcon2} />
          </HeaderitemCenter>
          <Headeritem2 className='flex items-center justify-center'>
            <img src={headerIcon3} />
          </Headeritem2>
        </div>
        {items.map((item, index) => {
          return (
            <SearchItem key={item.id}>
              <Label>{item.title}</Label>
              <Searcher onClick={updateFieldChanged(index)}>
                {item.text}{" "}
                <img
                  className='w-5 h-5 pointer-events-none  w-[13px] h-[13px]'
                  src={downArrow}
                />
              </Searcher>
              {item.active && (
                <AditionalPannel>
                  {item.aditionalSearchs.map((addedSearch) => {
                    return (
                      <AditionalItem
                        key={item.id}
                        onClick={updateFieldChanged(index)}
                        className='hover:bg-slate-100'
                      >
                        {addedSearch}
                      </AditionalItem>
                    );
                  })}
                </AditionalPannel>
              )}
            </SearchItem>
          );
        })}
        <LineHr></LineHr>
        <div className='flex justify-between'>
          <span className='flex items-center text-[13px]'>ფასი</span>
          <CurrencyContainer>
            {currency.map((item, index) => {
              return (
                <Currency
                  key={item.id}
                  className={item.active ? "bg-[black] text-white" : "bg-white"}
                  onClick={currenySwitcher(index)}
                >
                  {item.text}
                </Currency>
              );
            })}
          </CurrencyContainer>
        </div>
        <div className='flex justify-between mt-3.5'>
          <div>
            <PriceInput
              type='number'
              value={minPrice}
              placeholder='დან'
              onChange={(e) => dispatch(getMinPrice(e.target.value))}
            />
          </div>
          <Line>-</Line>
          <div>
            <PriceInput
              type='number'
              value={maxPrice}
              placeholder='მდე'
              onChange={(e) => dispatch(getMaxPrice(e.target.value))}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button type='submit' value='ძებნა' onClick={onSubmitHandler} />
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
