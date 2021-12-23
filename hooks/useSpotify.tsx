import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.NEXTAUTH_URL
});

const useSpotify = () => {
  const { data: session, status } = useSession();
  let token;

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }
      token = session.user.accessToken;
      spotifyApi.setAccessToken(token);
    }

  }, [session]);

  return spotifyApi;
};

export default useSpotify;
