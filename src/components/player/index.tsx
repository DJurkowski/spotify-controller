import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../../../atoms/songAtom";
import useSongInfo from "../../../hooks/useSongInfo";
import useSpotify from "../../../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status} = useSession();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [voulme, setVolume] = useState(100);
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

  useEffect(()=> {
    if (spotifyApi.getAccessToken() && !currentTrack) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrack, spotifyApi, session]); 

  console.log(songInfo);
  return (
    <div>
      <div> 
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images?.[0]?.url} alt={songInfo?.name} />

      </div>
    </div>
  );
};

export default Player;
