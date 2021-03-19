import React from 'react';
import {render, screen} from "@testing-library/react";
import RoomScreen from "./room-screen";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthorizationStatus, LoadStatus, SendStatus, ServiceAvailableStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../history";
import * as redux from "react-redux";

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

const mockStore = configureStore({});

describe(`RoomScreen tests`, () => {
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  it(`Room screen render correctly`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
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
          COMMENT: {
            status: SendStatus.INITIAL
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <RoomScreen match={{params: {id: 1}}}/>
          </Router>
        </Provider>
    );

    expect(fakeDispatch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
  });

  it(`Room screen render 'ServiceUnavailableScreen' when service unavailable`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH
          },
          CURRENT_OFFER: {
            current: mockOffer,
            reviews: [],
            nearest: [mockOffer],
            status: LoadStatus.FAILURE
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.UNAVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <RoomScreen match={{params: {id: 1}}}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Service is unavailable/i)).toBeInTheDocument();
  });

  it(`Room screen render 'NotFoundScreen' when loading status is equal to 'FAILURE'`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH
          },
          CURRENT_OFFER: {
            current: mockOffer,
            reviews: [],
            nearest: [mockOffer],
            status: LoadStatus.FAILURE
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <RoomScreen match={{params: {id: 1}}}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
  });

  it(`Room screen render 'Spiner' when load status is equal to 'INITIAL' or 'FETCHING'`, () => {
    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH
          },
          CURRENT_OFFER: {
            current: mockOffer,
            reviews: [],
            nearest: [mockOffer],
            status: LoadStatus.FETCHING
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <RoomScreen match={{params: {id: 1}}}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Spiner/i)).toBeInTheDocument();
  });
});
