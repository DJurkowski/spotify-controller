interface PlaylistProps {
  playlist: SpotifyApi.PlaylistObjectSimplified,
  clickFn: (id: string) => void,
};

const Playlist = ({ playlist, clickFn }: PlaylistProps) => {
  return <p className="cursor-pointer hover:text-white" onClick={()=> clickFn(playlist.id)}>{playlist.name}</p>;
};

export default Playlist;
