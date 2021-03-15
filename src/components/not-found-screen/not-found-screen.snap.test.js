import React from "react";
import {render} from "../../utils/test-utils";
import NotFoundScreen from "./not-found-screen";

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
    const {container} = render(
        <NotFoundScreen/>,
        {store: testStore},
    );
    expect(container).toMatchSnapshot();
  });
});
