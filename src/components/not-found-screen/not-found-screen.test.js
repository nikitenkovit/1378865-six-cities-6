import React from "react";
import {render} from "../../utils/test-utils";
import NotFoundScreen from "./not-found-screen";
import {screen} from "@testing-library/react";

const testStore = {
  USER: {
    user: {
      email: `test@test.ru`,
      name: `Name`,
    }
  }
};

describe(`NotFoundScreen tests`, () => {
  it(`Should NotFoundScreen render correctly`, () => {
    render(<NotFoundScreen/>, {store: testStore},
    );

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
  });
});
