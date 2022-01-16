import React from "react";
import Songs from "..";
import { converToMinutesAndSeconds } from "../../../../utils/time";
import moment from 'moment';
import useSpotify from "../../../../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../../../../atoms/songAtom";
import { isErrorState, errorMessageState } from "../../../../atoms/errorAtom";
import { Modal } from "../../modal";

interface SongProps {
  song: any;
  order: number;
};

const Song = ({ song, order }: SongProps) => {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [isError, setIsError] = useRecoilState(isErrorState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

  const playSong = () => {
    setCurrentTrack(song.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [song.track.uri],
    }).catch((err) => {
      setIsError(true);
      setErrorMessage(err.message);
      console.log(err.message);
    });
    console.log(song);
  };

  return (
    <tr className="hover:bg-gray-800 rounded-lg cursor-pointer" onClick={playSong}>
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-white">{order + 1}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-10 w-10"
            src={song.track.album.images[1].url}
            alt={song.track.name}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-200">
              {song.track.name}
            </div>
            <div className="text-sm text-gray-500">
              {song.track.artists[0].name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <p className="w-36 lg:w-64 truncate">
            {song.track.album.name}
          </p>
        </div>
      </td>
      <td className="hidden lg:block px-6 py-4 whitespace-nowrap">
        {song.added_at && 
          <div className="text-sm text-gray-500">{moment(song.added_at).format('MMM DD yyyy')}</div>
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {song.track.duration_ms && (
          <div className="text-sm text-gray-500">
            {converToMinutesAndSeconds(song.track.duration_ms)}
          </div>
        )}
      </td>
    </tr>
  );
};

export default Song;
