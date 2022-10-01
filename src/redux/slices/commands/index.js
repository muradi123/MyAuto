import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortTitle: "თარიღი კლებადი",
  sortfilter: [
    "თარიღი კლებადი",
    "თარიღი ზრდადი",
    "ფასი კლებადი",
    "ფასი ზრდადი",
    "გარბენი კლებადი",
    "გარბენი ზრდადი",
  ],
  searchers: [
    {
      text: "ყველა",
      title: "გარიგების ტიპი",
      aditionalSearchs: ["ყველა", "იყიდება", "ქირავდება"],
      active: false,
    },
    {
      text: "ყველა მწარმოებელი",
      title: "მწარმოებელი",
      aditionalSearchs: ["ყველა მწარმოებელი"],
      active: false,
    },
    {
      text: "ყველა კატეგორია",
      title: "კატეგორია",
      aditionalSearchs: ["ყველა კატეგორია"],
      active: false,
    },
  ],
  currency: [
    {
      text: "ლ",
      active: true,
    },
    {
      text: "$",
      active: false,
    },
  ],
  minPrice: "",
  maxPrice: "",
  carItems: [],
  filteredCarItems: [],
  isFilter: false,
  isDollar: false,
};

export const commandSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    getCars() {},
    CarsData(state, action) {
      action.payload[0].data.items.map((item) => state.carItems.push(item));
      action.payload[2].data.map((item) => {
        state.searchers[2].aditionalSearchs.push(item.title);
        state.carItems.map((car) => {
          if (car.category_id === Number(item.category_id)) {
            return (car.category_id = item.title);
          }
        });
      });
      action.payload[1].map((item) => {
        state.searchers[1].aditionalSearchs.push(item.man_name);
        state.carItems.map((car) => {
          if (car.man_id === Number(item.man_id)) {
            return (car.car_model = item.man_name);
          }
        });
      });
      state.carItems.sort((a, b) => {
        return parseFloat(b.prod_year) - parseFloat(a.prod_year);
      });
    },

    updateSearcher(state, action) {
      state.searchers = [];
      state.searchers = action.payload;
    },
    changeCurrency(state, action) {
      const newState = [...state.currency];
      newState.map((item) => (item.active = false));
      newState[action.payload[0]] = {
        text: action.payload[1].target.innerText,
        active: true,
      };
      if (action.payload[1].target.innerText === "ლ") {
        state.isDollar = false;
      } else {
        state.isDollar = true;
      }
      state.currency = newState;
    },
    getMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    getMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },

    changeSortTitle(state, action) {
      state.sortTitle = action.payload.trim();
      if (state.sortTitle.trim() === state.sortfilter[0].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(b.prod_year) - parseFloat(a.prod_year);
        });
      } else if (state.sortTitle.trim() === state.sortfilter[1].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(a.prod_year) - parseFloat(b.prod_year);
        });
      } else if (state.sortTitle.trim() === state.sortfilter[2].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      } else if (state.sortTitle.trim() === state.sortfilter[3].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } else if (state.sortTitle.trim() === state.sortfilter[4].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(b.car_run_km) - parseFloat(a.car_run_km);
        });
      } else if (state.sortTitle.trim() === state.sortfilter[5].trim()) {
        state.carItems.sort((a, b) => {
          return parseFloat(a.car_run_km) - parseFloat(b.car_run_km);
        });
      }
    },

    formSubmit(state, action) {
      state.isFilter = true;
      const forRentEvent = (car) => {
        if (
          state.searchers[0].text ===
          state.searchers[0].aditionalSearchs[2].trim()
        ) {
          return car.for_rent === true;
        } else if (
          state.searchers[0].text ===
          state.searchers[0].aditionalSearchs[1].trim()
        ) {
          return car.for_rent === false;
        } else if (
          state.searchers[0].text ===
          state.searchers[0].aditionalSearchs[0].trim()
        ) {
          return car.for_rent === false || car.for_rent === true;
        }
      };
      const modelEvent = (car) => {
        if (
          state.searchers[1].text.trim() !==
          state.searchers[1].aditionalSearchs[0].trim()
        ) {
          return car.car_model.trim() === state.searchers[1].text.trim();
        } else if (
          state.searchers[1].text.trim() ===
          state.searchers[1].aditionalSearchs[0].trim()
        ) {
          return car.car_model.trim() !== state.searchers[1].text.trim();
        }
      };

      const categoryEvent = (car) => {
        if (
          state.searchers[2].text.trim() !==
          state.searchers[2].aditionalSearchs[0].trim()
        ) {
          return car.category_id.trim() === state.searchers[2].text.trim();
        } else if (
          state.searchers[2].text.trim() ===
          state.searchers[2].aditionalSearchs[0].trim()
        ) {
          return car.category_id.trim() !== state.searchers[2].text.trim();
        }
      };
      const priceEventLari = (car) => {
        if (state.currency[0].active) {
          if (
            car.price_value > Number(state.minPrice) &&
            Number(state.maxPrice) == 0
          ) {
            return car.price_value > Number(state.minPrice);
          } else if (
            car.price_value < Number(state.maxPrice) &&
            Number(state.minPrice) == 0
          ) {
            return car.price_value < Number(state.maxPrice);
          } else if (
            car.price_value > Number(state.minPrice) &&
            car.price_value < Number(state.maxPrice) &&
            Number(state.maxPrice) !== 0 &&
            Number(state.minPrice) !== 0
          ) {
            return (
              car.price_value > Number(state.minPrice) &&
              car.price_value < Number(state.maxPrice)
            );
          }
        } else {
          if (
            car.price > Number(state.minPrice) &&
            Number(state.maxPrice) == 0
          ) {
            return car.price > Number(state.minPrice);
          } else if (
            car.price < Number(state.maxPrice) &&
            Number(state.minPrice) == 0
          ) {
            return car.price < Number(state.maxPrice);
          } else if (
            car.price > Number(state.minPrice) &&
            car.price < Number(state.maxPrice) &&
            Number(state.maxPrice) !== 0 &&
            Number(state.minPrice) !== 0
          ) {
            return (
              car.price > Number(state.minPrice) &&
              car.price < Number(state.maxPrice)
            );
          }
        }
      };
      const currencyEvent = () => {
        if (state.isDollar) {
          return state.isDollar;
        } else if (!state.isDollar) {
          return !state.isDollar;
        }
      };
      const result = state.carItems.filter(
        (car) =>
          categoryEvent(car) &&
          modelEvent(car) &&
          forRentEvent(car) &&
          priceEventLari(car) &&
          currencyEvent()
      );
      state.filteredCarItems = result;
    },
  },
});

export const {
  getCars,
  CarsData,
  mainFilter,
  changeSortTitle,
  updateSearcher,
  changeCurrency,
  getMaxPrice,
  getMinPrice,
  getModels,
  formSubmit,
} = commandSlice.actions;
export default commandSlice.reducer;
