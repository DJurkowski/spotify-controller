import Playlist from "./playlist";

interface PlaylistsProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[],
  clickFn: (id: string) => void,
};

const Playlists = ({ playlists, clickFn }: PlaylistsProps) => {
  return (
    <>
      {playlists.map((playlist, index) => (
        <Playlist key={index} playlist={playlist} clickFn={clickFn}/>
      ))}
    </>
  );
};

export default Playlists;
