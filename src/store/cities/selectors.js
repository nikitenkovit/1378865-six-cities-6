import NameSpace from '../name-space';

export const getCities = (state) => state[NameSpace.CITIES].items;

export const getCurrentCity = (state) => state[NameSpace.CITIES].current;
