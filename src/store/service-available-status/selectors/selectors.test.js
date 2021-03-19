import {getIsNeedShowServiceUnavailableScreen} from "./selectors";
import {ServiceAvailableStatus} from "../../../const";

describe(`Test service available status selectors`, () => {

  it(`getIsNeedShowServiceUnavailableScreen should be return 'true'`, () => {
    const mockStore = {
      SERVICE_AVAILABLE_STATUS: {
        status: ServiceAvailableStatus.UNAVAILABLE
      }
    };

    expect(getIsNeedShowServiceUnavailableScreen(mockStore)).toBe(true);
  });

  it(`getIsNeedShowServiceUnavailableScreen should be return 'false'`, () => {
    const mockStore = {
      SERVICE_AVAILABLE_STATUS: {
        status: ServiceAvailableStatus.AVAILABLE
      }
    };

    expect(getIsNeedShowServiceUnavailableScreen(mockStore)).toBe(false);
  });
});
