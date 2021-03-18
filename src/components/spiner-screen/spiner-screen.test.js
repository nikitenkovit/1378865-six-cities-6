import React from "react";
import {render, screen} from "@testing-library/react";
import SpinerScreen from "./spiner-screen";

it(`Should spiner render correctly`, () => {
  render(<SpinerScreen/>);

  expect(screen.getByText(/Spiner/i)).toBeInTheDocument();
});
