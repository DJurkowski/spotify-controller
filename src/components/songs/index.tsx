import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      <table className="table-auto divide-y divide-gray-800">
        <thead className="bg-trans">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-tight">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-tight">
              TITLE
            </th>
            <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-tight">
              ALBUM
            </th>
            <th scope="col" className="hidden lg:block px-6 py-3 text-left text-md font-medium text-gray-400 uppercase tracking-tight">
              DATE ADDED
            </th>
            <th scope="col" className="px-6 py-3 text-left text-md font-bold text-gray-400 uppercase tracking-tight">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-trans">
          {playlist?.tracks.items.map((song: any, index: number) => (
            <Song key={song.track.id} song={song} order={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
