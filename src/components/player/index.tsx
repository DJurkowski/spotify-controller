import { PauseIcon, ReplyIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline";
import { RewindIcon, PlayIcon, FastForwardIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../../../atoms/songAtom";
import useSongInfo from "../../../hooks/useSongInfo";
import useSpotify from "../../../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status} = useSession();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(100);
  const songInfo: any = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack()
        .then((data) => {
          console.log("Playing: ", data.body?.item);
          setCurrentTrack(data.body?.item?.id);

          spotifyApi.getMyCurrentPlaybackState()
            .then((data) => {
              setIsPlaying(data.body?.is_playing);
            })
        })
    }
  };

  const handlePlayPauseButton = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if(data.body) {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      }
    });
  };

  useEffect(()=> {
    if (spotifyApi.getAccessToken() && !currentTrack) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrack, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]); 

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500), []);
  

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs 
    md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4"> 
        <img 
          className="hidden md:inline h-10 w-10" 
          src={songInfo?.album?.images?.[0]?.url} 
          alt={songInfo?.name} 
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon 
          className="button"
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPauseButton} className="button w-10 h-10" />
        ): (
          <PlayIcon onClick={handlePlayPauseButton} className="button w-10 h-10" />
        )}

        <FastForwardIcon 
          className="button"
        />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon onClick={() => volume > 0 && setVolume(0)} className="button" />
        <input className="w-14 md:w-20" type="range" value={volume} onChange={ e => setVolume(Number(e.target.value))} min={0} max={100}/>
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(100)} className="button" />
      </div>
    </div>
  );
};

export default Player;
