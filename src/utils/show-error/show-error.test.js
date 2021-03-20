import {showError} from "./show-error";

it(`Should 'showError' work correctly`, () => {
  const mockElement = document.createElement(`h1`);
  mockElement.innerHTML = `Hello World!`;

  const expected = document.createElement(`h1`);
  expected.innerHTML = `Hello World!`;
  expected.style.animation = `shake 0.6s`;

  showError(mockElement);

  expect(mockElement).toEqual(expected);
});
