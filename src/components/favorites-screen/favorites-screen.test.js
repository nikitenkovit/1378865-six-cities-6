import React from 'react';
import {render, screen} from "@testing-library/react";
import FavoritesScreen from "./favorites-screen";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthorizationStatus, LoadStatus, ServiceAvailableStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../history";
import * as redux from "react-redux";

const mockStore = configureStore({});

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

describe(`FavoritesScreen tests`, () => {
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`Favorites screen render correctly`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
            user: {
              id: 1,
              email: `test@test.ru`,
              name: `test`,
              avatarUrl: `test`,
              isPro: false
            }
          },
          FAVORITES: {
            items: [[mockOffer.city.name, [mockOffer]]],
            status: LoadStatus.SUCCESS
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <FavoritesScreen/>
          </Router>
        </Provider>);

    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
  });

  it(`Favorites screen render 'ServiceUnavailableScreen' when service unavailable`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
            user: {
              id: 1,
              email: `test@test.ru`,
              name: `test`,
              avatarUrl: `test`,
              isPro: false
            }
          },
          FAVORITES: {
            items: [],
            status: LoadStatus.SUCCESS
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.UNAVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <FavoritesScreen/>
          </Router>
        </Provider>);

    expect(screen.getByText(/Service is unavailable/i)).toBeInTheDocument();
  });

  it(`Favorites screen render 'FavoritesEmptyScreen' when favorites list empty`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
            user: {
              id: 1,
              email: `test@test.ru`,
              name: `test`,
              avatarUrl: `test`,
              isPro: false
            }
          },
          FAVORITES: {
            items: [],
            status: LoadStatus.SUCCESS
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <FavoritesScreen/>
          </Router>
        </Provider>);

    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  });

  it(`Favorites screen render 'Spiner' when offers list empty and load status equally initial or fetching`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
            user: {
              id: 1,
              email: `test@test.ru`,
              name: `test`,
              avatarUrl: `test`,
              isPro: false
            }
          },
          FAVORITES: {
            items: [],
            status: LoadStatus.FETCHING
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <FavoritesScreen/>
          </Router>
        </Provider>);

    expect(screen.getByText(/Spiner/i)).toBeInTheDocument();
  });
});
