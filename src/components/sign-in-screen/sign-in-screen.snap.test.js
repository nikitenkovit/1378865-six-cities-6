import React from "react";
import {render} from "../../utils/test-utils";
import SignInScreen from "./sign-in-screen";

const testStore = {
  USER: {
    user: null
  }
};

describe(`SignInScreen tests`, () => {
  it(`Should SignInScreen render correctly`, () => {
    const {container} = render(
        <SignInScreen/>,
        {store: testStore},
    );
    expect(container).toMatchSnapshot();
  });
});
