import {adaptOfferData, getOffersByCity, getIsNeedShowError, getIsNeedShowSpiner, getIsNeedRedirect} from "./selectors";
import {LoadStatus} from "../../../const";

describe(`Test offers selectors`, () => {
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
      "avatar_url": `./img/avatar-angelina.jpg`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`
    },
    "id": 1,
    "images": [`./img/apartment-01.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`, `./img/room.jpg`, `./img/apartment-02.jpg`, `./img/apartment-03.jpg`],
    "is_favorite": true,
    "is_premium": false,
    "location": {
      "latitude": 52.5909553943508,
      "longitude": 4.95309666406198,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `./img/apartment-01.jpg`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`
  };

  it(`adaptOfferData should be work correctly`, () => {

    const expected = {
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
        "avatarUrl": `./img/avatar-angelina.jpg`,
        "id": 3,
        "isPro": true,
        "name": `Angelina`
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

    expect(adaptOfferData(mockOffer)).toEqual(expected);
  });

  it(`getOffersByCity should be return 'true'`, () => {
    const mockStore = {
      OFFERS: {
        items: [{city: {name: `Paris`}}, {city: {name: `Amsterdam`}}],
        status: LoadStatus.SUCCESS
      },
      CITIES: {
        current: {
          name: `Paris`,
        }
      },
    };

    const expected = [{city: {name: `Paris`}}];

    expect(getOffersByCity(mockStore)).toEqual(expected);
  });

  it(`getIsNeedShowError should be return 'true'`, () => {
    const mockStore = {
      OFFERS: {
        items: [],
        status: LoadStatus.FAILURE
      },
      CITIES: {
        current: {
          name: `Paris`,
        }
      },
    };
    expect(getIsNeedShowError(mockStore)).toBe(true);
  });

  it(`getIsNeedShowError should be return 'false'`, () => {
    const mockStore = {
      OFFERS: {
        items: [{city: {name: `Paris`}}, {city: {name: `Amsterdam`}}],
        status: LoadStatus.SUCCESS
      },
      CITIES: {
        current: {
          name: `Paris`,
        }
      },
    };
    expect(getIsNeedShowError(mockStore)).toBe(false);
  });

  it(`getIsNeedRedirect should be return 'true'`, () => {
    const mockStore = {
      OFFERS: {
        items: [],
        status: LoadStatus.SUCCESS
      },
      CITIES: {
        current: {
          name: `Paris`,
        }
      },
    };
    expect(getIsNeedRedirect(mockStore)).toBe(true);
  });

  it(`getIsNeedRedirect should be return 'false'`, () => {
    const mockStore = {
      OFFERS: {
        items: [],
        status: LoadStatus.FAILURE
      },
      CITIES: {
        current: {
          name: `Paris`,
        }
      },
    };
    expect(getIsNeedRedirect(mockStore)).toBe(false);
  });

  it(`getIsNeedShowSpiner should be return 'true'`, () => {
    const mockStore = {
      OFFERS: {
        status: LoadStatus.INITIAL
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(true);
  });

  it(`getIsNeedShowSpiner should be return 'false'`, () => {
    const mockStore = {
      OFFERS: {
        status: LoadStatus.SUCCESS
      },
    };
    expect(getIsNeedShowSpiner(mockStore)).toBe(false);
  });
});
