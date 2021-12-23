import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import avatar from "../../../assets/logo.png";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import {
  activePlaylistState,
  playlistState,
} from "../../../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../../../hooks/useSpotify";
import Playlist from "../playlists/playlist";
import Songs from "../songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("");
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const activePlaylist = useRecoilValue(activePlaylistState);

  useEffect(() => {
    setColor(shuffle(colors).pop() || "from-green-500");
  }, [activePlaylist]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(activePlaylist)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Error catch", err));
  }, [spotifyApi, activePlaylist]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={ () => signOut()}>
          <img
            className="w-10 h-10"
            src={session?.user?.image || avatar.src}
            alt="Avatar"
          />
          <h2 className="font-extrabold">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
