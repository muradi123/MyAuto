import { all, takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { CarsData } from "../slices/commands";
import axios from "axios";

const fetchCars = async () => {
  try {
    const response = await axios.get(`https://api2.myauto.ge/ka/products/`);
    return response;
  } catch (error) {
    console.warn(error);
  }
};

const fetchMans = async () => {
  try {
    const response = await axios.get(
      `https://static.my.ge/myauto/js/mans.json`
    );
    return response;
  } catch (error) {
    console.warn(error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`https://api2.myauto.ge/ka/cats/get`);
    return response;
  } catch (e) {
    console.log(e.message);
  }
};

export function* fetchCarsData() {
  try {
    let cars = yield call(() => fetchCars());
    let carsModel = yield call(() => fetchMans());
    let categories = yield call(() => fetchCategories());
    yield put(CarsData([cars.data, carsModel.data, categories.data]));
  } catch (e) {
    console.log(e.message);
  }
}

export default function* rootSaga() {
  yield all([takeLatest("commands/getCars", fetchCarsData)]);
}
