import React from 'react';
import {render, screen} from "@testing-library/react";
import App from './app';
import {
  AppRoute,
  LoadStatus,
  SendStatus,
  AuthorizationStatus,
  DefaultCitiesList,
  ServiceAvailableStatus
} from "../../const";
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import browserHistory from "../../history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

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

const wrapper = ({children}) => (
  <Provider store={mockStore({
    OFFERS: {
      items: [mockOffer],
      status: LoadStatus.SUCCESS
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: {
        id: 1,
        email: `test@test.ru`,
        name: `test`,
        avatarUrl: `test`,
        isPro: false
      }
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
    },
    COMMENT: {
      status: SendStatus.INITIAL
    },
    SERVICE_AVAILABLE_STATUS: {
      status: ServiceAvailableStatus.AVAILABLE
    }
  })}>
    <Router history={browserHistory}>
      {children}
    </Router>
  </Provider>
);

describe(`Test routing`, () => {
  const fakeDispatch = jest.fn();

  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`App render 'SpinerScreen' when authorizationStatus is equal to null`, () => {

    render(<Provider store={mockStore({
      USER: {
        authorizationStatus: null,
        user: {
          id: 1,
          email: `test@test.ru`,
          name: `test`,
          avatarUrl: `test`,
          isPro: false
        }
      }
    })}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </Provider>);

    expect(screen.getByText(/Spiner/i)).toBeInTheDocument();
  });

  it(`Render 'MainScreen' when user navigate to ${AppRoute.MAIN} url`, () => {

    render(<App/>, {wrapper});

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it(`Render 'SignInScreen' when user navigate to ${AppRoute.LOGIN} url`, () => {

    browserHistory.push(AppRoute.LOGIN);

    render(<App/>, {wrapper});

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'FavoritesScreen' if user authorized and when user navigate to ${AppRoute.FAVORITES} url`, () => {
    browserHistory.push(AppRoute.FAVORITES);

    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.AUTH,
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
            <App/>
          </Router>
        </Provider>);

    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  });

  it(`If user not authorized and when user navigate to ${AppRoute.FAVORITES} url should render SignInScreen`, () => {
    browserHistory.push(AppRoute.FAVORITES);

    render(
        <Provider store={mockStore({
          USER: {
            authorizationStatus: AuthorizationStatus.NO_AUTH,
          },
          SERVICE_AVAILABLE_STATUS: {
            status: ServiceAvailableStatus.AVAILABLE
          }
        })}>
          <Router history={browserHistory}>
            <App/>
          </Router>
        </Provider>);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'RoomScreen' when user navigate to ${AppRoute.ROOM} url`, () => {
    browserHistory.push(AppRoute.ROOM);

    render(<App/>, {wrapper});

    expect(fakeDispatch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    browserHistory.push(`/non-existent-route`);

    render(<App/>, {wrapper});

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
  });
});
