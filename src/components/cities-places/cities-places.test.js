import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {AuthorizationStatus, DefaultCitiesList, LoadStatus, ServiceAvailableStatus} from "../../const";
import browserHistory from "../../history";
import CitiesPlaces from "./cities-places";

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

it(`CitiesPlaces render correctly`, () => {
  render(<Provider store={mockStore({
    OFFERS: {
      items: [mockOffer],
      status: LoadStatus.SUCCESS
    },
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
    SERVICE_AVAILABLE_STATUS: {
      status: ServiceAvailableStatus.AVAILABLE
    }
  })}>
    <Router history={browserHistory}>
      <CitiesPlaces/>
    </Router>
  </Provider>);

  expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
});
