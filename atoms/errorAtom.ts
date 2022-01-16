import { atom } from 'recoil';

export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

export const isErrorState = atom({
  key: "isErrorState",
  default: false,
});