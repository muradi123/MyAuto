import React, { useState } from "react";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import runImage from "../../assets/run.png";
import whell from "../../assets/wheel.png";

const Cart = tw.div`
    flex
    items-start
    flex-col
    gap-10
    px-4
    py-4
    bg-[#fff]
    h-max
    rounded-lg
    md:flex-row
`;

const CartTitle = tw.div`
    font-bold
    capitalize
`;

const CarImg = tw.img`
    w-full
    rounded-lg
    md:w-[250px]
    
`;

const CarYear = tw.div`
    text-[#8C929B]
`;

const CartItem = tw.div`
    flex
    items-center
    gap-2
`;

const Grid = tw.div`
    grid
    grid-cols-2
    gap-5
    md:grid-cols-3
`;

const GreySubtitle = tw.div`
    text-[#6F7383]
`;

const PriceText = tw.p`
    font-bold
    text-lg
`;
const Dollar = tw.div`
    flex
    items-center
    justify-center
    padding-[5px, 5px]
    rounded-full
    bg-[#F2F3F6]
    w-8
    h-8
    text-[black]
    cursor-pointer
`;
const Lari = tw.div`
    flex
    items-center
    justify-center
    bg-[#F2F3F6]
    padding-[5px, 5px]
    rounded-full
    w-8
    h-8
    text-[black]
    cursor-pointer
`;

const CarItem = ({
  carName,
  year,
  photo,
  price,
  carId,
  carKm,
  rightWhell,
  views,
  customsPassed,
  priceInLari,
  isDollar,
}) => {
  return (
    <Cart>
      <CarImg
        src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${carId}_1.jpg`}
      />
      <Grid>
        <CartTitle>{carName} </CartTitle>
        <CarYear>{year} წ</CarYear>
        <GreySubtitle>
          {customsPassed ? "განბაჟებული" : "განუბაჟებელი"}
        </GreySubtitle>
        <CartItem>
          <img src={runImage} alt='' />
          <p>{carKm}</p>
        </CartItem>
        <CartItem>
          <img src={whell} alt='' />
          <p>{rightWhell ? "მარჯვენა" : "მარცხენა"}</p>
        </CartItem>
        <CartItem>
          <GreySubtitle>{views} ნახვა</GreySubtitle>
        </CartItem>
        <CartItem>
          <GreySubtitle>
            {isDollar ? (
              <div className='flex gap-3 items-center'>
                <PriceText>{price}</PriceText>
                <Dollar>$</Dollar>
              </div>
            ) : (
              <div className='flex gap-3 items-center'>
                <PriceText>{priceInLari}</PriceText>
                <Lari>ლ</Lari>
              </div>
            )}
          </GreySubtitle>
        </CartItem>
      </Grid>
    </Cart>
  );
};

export default React.memo(CarItem);
