import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null
});

export const activePlaylistState = atom({
  key: "activePlaylistState",
  default: "6WzpZxMvE4jhmvYOulNLrw",
});
