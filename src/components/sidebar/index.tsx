import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { activePlaylistState } from "../../../atoms/playlistAtom";
import useSpotify from "../../../hooks/useSpotify";
import Playlists from "../playlists";
import Button from "./Button";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [activePlaylist, setActivePlaylist] = useRecoilState(activePlaylistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        {/* <Button text="Log out" Icon={HomeIcon} onClick={() => signOut()}/> */}
        <Button text="Home" Icon={HomeIcon} />
        <Button text="Search" Icon={SearchIcon} />
        <Button text="Your Library" Icon={LibraryIcon} />
        <hr className="border-t-[0.1px] border-gray-900" />

        <Button text="Create Playlist" Icon={PlusCircleIcon} />
        <Button text="Like songs" Icon={HeartIcon} classIconString="text-green-500"/>
        <Button text="Your episodes" Icon={RssIcon} />

        <hr className="border-t-[0.1px] border-gray-900" />

        <Playlists playlists={playlists} clickFn={setActivePlaylist}/>
      </div>
    </div>
  );
};

export default Sidebar;
