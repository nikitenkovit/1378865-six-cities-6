import React from 'react';
import {render} from "../../utils/test-utils";
import App from './app';
import {AppRoute, LoadStatus, AuthorizationStatus, DefaultCitiesList} from "../../const";
import * as redux from 'react-redux';

import browserHistory from "../../history";

const mockOffer = {
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.5909553943508,
      "longitude": 4.95309666406198,
      "zoom": 12
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatarUrl": `test`,
    "id": 3,
    "isPro": true,
    "name": `test`
  },
  "id": 1,
  "images": [`./img/apartment-01.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`, `./img/room.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`],
  "isFavorite": true,
  "isPremium": false,
  "location": {
    "latitude": 52.5909553943508,
    "longitude": 4.95309666406198,
    "zoom": 8
  },
  "maxAdults": 4,
  "previewImage": `./img/apartment-01.jpg`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
};

const mockStore = {
  OFFERS: {
    items: [mockOffer],
    status: LoadStatus.SUCCESS
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: null
  },
  CITIES: {
    items: DefaultCitiesList,
    current: {
      name: `Paris`,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    }
  },
  OFFER_LOCATION: {
    latitude: 48.83861,
    longitude: 2.350499,
  },
  CURRENT_OFFER: {
    current: mockOffer,
    reviews: [{
      "comment": `test`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 1,
      "rating": 4,
      "user": {
        "avatarUrl": `test`,
        "id": 4,
        "isPro": false,
        "name": `test`
      }
    }],
    nearest: [mockOffer],
    status: LoadStatus.SUCCESS
  },
  FAVORITES: {
    items: [],
    status: LoadStatus.SUCCESS
  }
};

describe(`Test routing`, () => {
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainScreen' when user navigate to ${AppRoute.MAIN} url`, () => {

    const {container} = render(
        <App/>,
        {store: mockStore}
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'SignInScreen' when user navigate to ${AppRoute.LOGIN} url`, () => {

    browserHistory.push(AppRoute.LOGIN);

    const {container} = render(
        <App/>,
        {store: mockStore}
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'RoomScreen' when user navigate to ${AppRoute.ROOM} url`, () => {
    browserHistory.push(AppRoute.ROOM);

    jest.spyOn(redux, `useDispatch`);

    const {container} = render(
        <App/>,
        {store: mockStore});
    expect(container).toMatchSnapshot();
  });
});
