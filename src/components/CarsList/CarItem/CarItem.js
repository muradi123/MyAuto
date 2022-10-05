import React from "react";
import tw from "tailwind-styled-components";
import runImage from "../../assets/run.png";
import whell from "../../assets/wheel.png";
import checked from "../../assets/check.png";
import transmis from "../../assets/transmis.png";
import georgiaIcon from "../../assets/georgia.png";
import engine from "../../assets/engine.png";
import pen from "../../assets/pen.png";
import heart from "../../assets/heart.png";
import splittedCar from "../../assets/splittedCar.png";

const Cart = tw.div`
    flex
    items-start
    flex-col
    gap-5
    px-4
    py-4
    bg-[#fff]
    border-2
    h-max
    rounded-lg
    cursor-pointer
    hover:bg-[#F0F9F7] 
    hover:border-[#59D8C9]
    md:flex-row
`;

const CartTitle = tw.div`
    flex
    gap-3
    font-bold
    capitalize
    text-[14px]
    text-[#272A37]
`;

const CarImg = tw.img`
    w-full
    rounded-lg
    h-full
    w-full
    md:w-[182px]
    md:h-[144px]
`;

const CarYear = tw.div`
    text-[#8C929B]
`;

const Checked = tw.img`
    w-[8px]
    h-[8px]
`;

const CartItem = tw.div`
    flex
    items-center
    gap-2
    text-[12px]
`;

const Grid = tw.div`
    grid
    grid-cols-1
    w-full
    gap-2
`;

const Failed = tw.div`
   text-[11px]
   text-[#FF3B30]
`;

const ImageContainer = tw.div`
   flex
   gap-3
`;

const IconImage = tw.img`
   w-[15px]
   h-[15px]
   cursor-pointer
`;

const Success = tw.div`
   flex
   items-center
   gap-1.5
   text-[11px]
   text-[#26B753]
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

const Text = tw.div`
    text-[#1B1D25]
    text-[12px]
    whitespace-nowrap
`;

const GridItem = tw.div`
    flex
    gap-4
    justify-between
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
  fuel_type_id,
  priceInLari,
  isDollar,
}) => {
  let fuels = {
    2: "ბენზინი",
    3: "დიზელი",
    5: "გაზი/ბენზინი",
    6: "ჰიბრიდი",
    7: "ელექტრო",
    10: "დატენვადი ჰიბრიდი",
    12: "წყალბადი",
    8: "ბუნებრივი გაზი",
    9: "თხევადი გაზი",
    11: "ჰიბრიდი",
  };
  return (
    <Cart>
      <GridItem className='w-full md:hidden'>
        <div className='flex flex-col gap-3 w-full'>
          <div>
            <CartTitle>
              {carName} <CarYear>{year} წ</CarYear>
            </CartTitle>
          </div>
          <div>
            <div className='flex justify-end items-start'>
              <div className='flex items-center w-full justify-between gap-3'>
                <GreySubtitle className='text-[#272A37]'>
                  {isDollar ? (
                    <div className='flex gap-3 items-center'>
                      <PriceText>{price}</PriceText>
                      <Dollar className='text-[#272A37] font-bold'>$</Dollar>
                    </div>
                  ) : (
                    <div className='flex gap-3 items-center'>
                      <PriceText>{priceInLari}</PriceText>
                      <Lari className='text-[#272A37] font-bold'>ლ</Lari>
                    </div>
                  )}
                </GreySubtitle>
                <GreySubtitle>
                  {customsPassed ? (
                    <Success>
                      <Checked src={checked} /> განბაჟებული
                    </Success>
                  ) : (
                    <Failed>განბაჯება 2176ლ</Failed>
                  )}
                </GreySubtitle>
              </div>
            </div>
          </div>
        </div>
      </GridItem>
      <CarImg
        src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${carId}_1.jpg`}
      />
      <Grid>
        <GridItem className="hidden md:flex">
          <div>
            <CartTitle>
              {carName} <CarYear>{year} წ</CarYear>
            </CartTitle>
          </div>
          <div>
            <div className='flex justify-end items-start'>
              <div className='flex items-center gap-3'>
                <GreySubtitle>
                  {customsPassed ? (
                    <Success>
                      <Checked src={checked} /> განბაჟებული
                    </Success>
                  ) : (
                    <Failed>განბაჯება 2176ლ</Failed>
                  )}
                </GreySubtitle>
                <div className='flex items-center gap-2'>
                  <img src={georgiaIcon} className='w-[16px]' />
                  <GreySubtitle className='text-[12px]'>თბილისი</GreySubtitle>
                </div>
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem>
          <div className='flex items-center justify-between w-[40%] gap-10'>
            <CartItem className='min-w-[120px]'>
              <img src={engine} />
              <Text>1.8 {fuels[fuel_type_id]}</Text>
            </CartItem>
            <CartItem className='min-w-[90px]'>
              <img src={runImage} alt='' />
              <Text>{carKm} კმ</Text>
            </CartItem>
          </div>
          <div>
            <CartItem className="hidden md:flex">
              <GreySubtitle className='text-[#272A37]'>
                {isDollar ? (
                  <div className='flex gap-3 items-center'>
                    <PriceText>{price}</PriceText>
                    <Dollar className='text-[#272A37] font-bold'>$</Dollar>
                  </div>
                ) : (
                  <div className='flex gap-3 items-center'>
                    <PriceText>{priceInLari}</PriceText>
                    <Lari className='text-[#272A37] font-bold'>ლ</Lari>
                  </div>
                )}
              </GreySubtitle>
            </CartItem>
          </div>
        </GridItem>
        <GridItem>
          <div className='flex items-center justify-between w-[40%] gap-10'>
            <CartItem className='min-w-[120px]'>
              <img src={transmis} />
              <Text>ავტომატიკა</Text>
            </CartItem>
            <CartItem className='min-w-[90px]'>
              <img src={whell} alt='' />
              <p>{rightWhell ? "მარჯვენა" : "მარცხენა"}</p>
            </CartItem>
          </div>
        </GridItem>
        <GridItem className='mt-5'>
          <div className='flex items-center justify-between  gap-10'>
            <GreySubtitle className='text-[12px]'>
              {views} ნახვა • 2 დღის წინ
            </GreySubtitle>
          </div>
          <ImageContainer>
            <IconImage src={pen} />
            <IconImage src={splittedCar} />
            <IconImage src={heart} />
          </ImageContainer>
        </GridItem>
      </Grid>
    </Cart>
  );
};

export default React.memo(CarItem);
