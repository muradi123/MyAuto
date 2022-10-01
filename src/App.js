import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCars } from "./redux/slices/commands";
import { Container } from "./components/Shared/Container/Container";
import Header from "./components/Header/Header";
import CarList from "./components/CarsList/List/CarList";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <Container>
      <Header />
      <CarList />
    </Container>
  );
};

export default App;
