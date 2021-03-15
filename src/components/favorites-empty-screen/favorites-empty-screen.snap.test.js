import React from "react";
import {render} from "../../utils/test-utils";
import FavoritesEmptyScreen from "./favorites-empty-screen";

const testStore = {
  USER: {
    user: {
      email: `test@test.ru`,
      name: `Name`,
    }
  }
};

it(`Should FavoritesEmptyScreen render correctly`, () => {
  const {container} = render(
      <FavoritesEmptyScreen/>,
      {store: testStore},
  );
  expect(container).toMatchSnapshot();
});
