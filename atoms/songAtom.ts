import { atom } from 'recoil';

export const currentTrackState = atom({
  key: "currentTrackState",
  default: <any>null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: <any>null,
});