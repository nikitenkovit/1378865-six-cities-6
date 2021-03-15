import React from "react";
import {render} from "@testing-library/react";
import Review from "./review";

const review = {
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatarUrl": `./img/avatar-max.jpg`,
    "id": 4,
    "isPro": false,
    "name": `Max`
  }
};

it(`Should Review render correctly`, () => {
  const {container} = render(
      <Review review={review}/>);
  expect(container).toMatchSnapshot();
});
