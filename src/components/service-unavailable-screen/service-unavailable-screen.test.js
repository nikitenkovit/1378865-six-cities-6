import React from "react";
import {render, screen} from "@testing-library/react";
import ServiceUnavailableScreen from "./service-unavailable-screen";

it(`Should ServiceIsUnavailableScreen render correctly`, () => {
  render(<ServiceUnavailableScreen/>);

  expect(screen.getByText(/Service is unavailable/i)).toBeInTheDocument();
  expect(screen.getByText(/Try refreshing the page later/i)).toBeInTheDocument();
});
