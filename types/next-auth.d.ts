import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name,
      email,
      image,
      accessToken,
      refreshToken,
      username,
    }
  };
};