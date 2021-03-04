export const getRatingStarValue = (number) => {
  return Math.round(number) * 20 + `%`;
};
