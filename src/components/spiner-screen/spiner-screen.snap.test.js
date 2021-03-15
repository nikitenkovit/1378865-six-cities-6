import React from "react";
import {render} from "@testing-library/react";
import SpinerScreen from "./spiner-screen";

it(`Should spiner render correctly`, () => {
  const {container} = render(<SpinerScreen/>);
  expect(container).toMatchSnapshot();
});
