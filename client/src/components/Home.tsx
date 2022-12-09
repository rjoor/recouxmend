import { emitWarning } from "process";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [userInfoQueried, setUserInfoQueried] = useState<boolean>(false);
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
  }, [userInfoQueried]);

  const getUserInfoHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setUserInfoQueried(true);
  };

  return (
    <>
      <div>Welcome</div>
      <button onClick={getUserInfoHandler}>Get user info</button>
    </>
  );
};

export default Home;
