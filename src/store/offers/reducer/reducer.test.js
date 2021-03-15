import offersReducer from "./reducer";
import {SET_OFFERS, UPDATE_OFFERS, CHANGE_STATUS} from "../action-types";
import {LoadStatus} from "../../../const";

const initialState = {
  items: [],
  status: LoadStatus.INITIAL,
};

const Mock = {
  offerOne: {
    "id": 1,
    "is_favorite": true,
  },
  offerTwo: {
    "id": 2,
    "is_favorite": true,
  },
  offerThree: {
    "id": 3,
    "is_favorite": true,
  },
};

describe(`Offers reducer work correctly`, () => {
  it(`Reducer without parameters should initial state`, () => {

    expect(offersReducer(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should set offers correctly`, () => {

    const action = {
      type: SET_OFFERS,
      payload: [Mock.offerOne, Mock.offerTwo, Mock.offerThree]
    };

    const expected = {
      items: [Mock.offerOne, Mock.offerTwo, Mock.offerThree],
      status: LoadStatus.INITIAL,
    };

    expect(offersReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should change status correctly`, () => {

    const action = {
      type: CHANGE_STATUS,
      payload: LoadStatus.SUCCESS
    };

    const expected = {
      items: [],
      status: LoadStatus.SUCCESS,
    };

    expect(offersReducer(initialState, action))
      .toEqual(expected);
  });

  it(`Reducer should update offers correctly`, () => {

    const updatedOffer = {
      "id": 2,
      "is_favorite": false,
    };

    const state = {
      items: [Mock.offerOne, Mock.offerTwo, Mock.offerThree],
      status: LoadStatus.INITIAL,
    };

    const action = {
      type: UPDATE_OFFERS,
      payload: updatedOffer
    };

    const expected = {
      items: [Mock.offerOne, updatedOffer, Mock.offerThree],
      status: LoadStatus.INITIAL,
    };

    expect(offersReducer(state, action))
      .toEqual(expected);
  });
});
