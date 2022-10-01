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

const Title = tw.div`
   flex
   items-center
   gap-3
   text-[#6F7383]
   mt-8
   mb-5
`;

const Form = tw.form`
   flex
   flex-col
   gap-3
   w-full
   bg-[#fff]
   py-5
   px-5
`;

const Arrow = tw.div`
   w-2
   h-2
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
`;

const Searcher = tw.div`
   flex
   items-center
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
`;

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
   padding-[5px, 5px]
   border-2
   rounded-full
   cursor-pointer
`;

const Currency = tw.div`
   flex
   items-center
   justify-center
   padding-[5px, 5px]
   rounded-full
   w-10
   h-10
   text-[#8C929B]
   cursor-pointer
`;

const PriceInput = tw.input`
   flex
   items-center
   justify-center
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
        {items.map((item, index) => {
          return (
            <SearchItem key={item.id}>
              <Label>{item.title}</Label>
              <Searcher onClick={updateFieldChanged(index)}>
                {item.text}{" "}
                <img className='w-5 h-5 pointer-events-none' src={downArrow} />
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
        <div className='flex justify-between'>
          <span className='flex items-center'>ფასი</span>
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
          <Button type='submit' value='ძიება' onClick={onSubmitHandler} />
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
