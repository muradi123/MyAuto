import React from "react";
import SearchForm from "../../SeachForm/SearchForm";
import { InnerContainer } from "../../Shared/Container/InnerContainer";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import CarItem from "../CarItem/CarItem";
import SorterSection from "../../Sorter/Sorter";

const Grid = tw.div`
   grid
   grid-cols-[1fr]
   gap-5
   md:grid-cols-[1fr,3fr]
`;

const CarListContainer = tw.div` 
   grid
   grid-cols-1
   justify-self-center
   gap-5
   mt-5
   md:justify-self-auto
`;

const Title = tw.div`
   text-[#272A37]
`;

const Sorter = tw.div` 
   flex
   justify-between
   flex-col
   gap-4
   md:flex-row
   my-3
`;

const Loading = tw.div` 
    font-bold
    my-5
    tracking-widest
`;

const CarList = () => {
  const products = useSelector((state) => state.commandSlice.carItems);
  const isDollar = useSelector((state) => state.commandSlice.isDollar);
  const isFilter = useSelector((state) => state.commandSlice.isFilter);
  const filteredProducts = useSelector(
    (state) => state.commandSlice.filteredCarItems
  );

  return (
    <InnerContainer>
      <Grid>
        <SearchForm />
        <CarListContainer>
          <Sorter>
            <Title>{products.length} განცხადება</Title>
            <SorterSection />
          </Sorter>
          {isFilter ? (
            filteredProducts.length > 0 ? (
              filteredProducts.map((item) => {
                return (
                  <CarItem
                    key={item.car_id}
                    id={item.car_id}
                    carName={item.car_model}
                    year={item.prod_year}
                    manId={item.man_id}
                    carId={item?.car_id}
                    currenyId={item.currency_id}
                    photo={item?.photo}
                    carKm={item?.car_run_km}
                    rightWhell={item.right_wheel}
                    views={item.views}
                    customsPassed={item?.customs_passed}
                    price={item.price}
                    priceInLari={item.price_value}
                    isDollar={isDollar}
                  />
                );
              })
            ) : (
              <Loading>not found</Loading>
            )
          ) : (
            products.map((item) => {
              return (
                <CarItem
                  key={item.car_id}
                  id={item.car_id}
                  carName={item.car_model}
                  year={item.prod_year}
                  manId={item.man_id}
                  carId={item?.car_id}
                  currenyId={item.currency_id}
                  photo={item?.photo}
                  carKm={item?.car_run_km}
                  rightWhell={item.right_wheel}
                  views={item.views}
                  customsPassed={item?.customs_passed}
                  price={item.price}
                  priceInLari={item.price_value}
                  isDollar={isDollar}
                />
              );
            })
          )}
        </CarListContainer>
      </Grid>
    </InnerContainer>
  );
};

export default CarList;
