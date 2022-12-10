import { emitWarning } from "process";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [userInfoQueried, setUserInfoQueried] = useState<boolean>(false);
  const [topTracksRequested, setTopTracksRequested] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<any>([]);
  const [search] = useSearchParams();
  const code = search.get("code")!;
  const state = search.get("state")!;
  const params: Record<string, string> = {
    code,
    state,
  };

  useEffect(() => {
    if (!userInfoQueried) {
      fetch(
        "http://localhost:3001/callback?" + new URLSearchParams(params)
      ).then((res) => console.log(res));
    } else {
      fetch("http://localhost:3001/me")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }

    if (topTracksRequested) {
      fetch("http://localhost:3001/toptracks")
        .then((res) => res.json())
        .then((data) => setTopTracks(data));
    }
  }, [userInfoQueried, topTracksRequested]);

  const getUserInfoHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setUserInfoQueried(true);
  };

  const getTopTracksHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTopTracksRequested(true);
  };

  let topTracksDisplay;
  if (topTracksRequested) {
    console.log(topTracks);

    topTracksDisplay = topTracks.map((track: any) => (
      <h2>
        {track.name}
        {track.artists.map((artist: any) => (
          <h1>{artist.name}</h1>
        ))}
      </h2>
    ));
  }

  return (
    <>
      <div>Welcome</div>
      <button onClick={getUserInfoHandler}>Get user info</button>
      <button onClick={getTopTracksHandler}>Get my top tracks</button>
      {topTracksDisplay}
    </>
  );
};

export default Home;
