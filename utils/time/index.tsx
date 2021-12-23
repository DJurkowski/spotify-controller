
export const converToMinutesAndSeconds = (miliseconds: number) => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = Number(((miliseconds % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};
