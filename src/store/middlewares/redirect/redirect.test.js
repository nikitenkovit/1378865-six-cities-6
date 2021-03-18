import {redirect} from "./redirect";
import RedirectActionCreator from '../action-creator/action-creator';
import {AppRoute} from "../../../const";

const mockRedux = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };

  const next = jest.fn();
  const invoke = (action) => redirect(store)(next)(action);
  return {store, next, invoke};
};

const fakeHistory = {
  location: {pathname: ``},
  push(path) {
    this.location.pathname = path;
  }
};

jest.mock(`../../../history.js`, () => fakeHistory);

describe(`Custom middleware works correctly`, () => {
  it(`Action passes to next middleware`, () => {
    const {invoke, next} = mockRedux();
    const action = RedirectActionCreator.redirectToRoute(`/`);
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it(`Redirect route should be added to fakeHistory`, () => {
    const {invoke} = mockRedux();
    invoke(RedirectActionCreator.redirectToRoute(`${AppRoute.LOGIN}`));
    expect(fakeHistory.location.pathname).toBe(`${AppRoute.LOGIN}`);

    invoke(RedirectActionCreator.redirectToRoute(`${AppRoute.MAIN}`));
    expect(fakeHistory.location.pathname).toBe(`${AppRoute.MAIN}`);
  });

  it(`Non redirect because bad action`, () => {
    const url = `test-url`;
    const {invoke} = mockRedux();
    invoke({type: `TEST_ACTION`, payload: url});
    expect(fakeHistory.location.pathname).not.toBe(url);
  });
});
