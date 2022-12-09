import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ApiTest = () => {
  const [loginRequested, setLoginRequested] = useState<boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/login").then((res) => setLoginUrl(res.url));
  }, [loginRequested]);

  const loginRequestHandler = () => {
    setLoginRequested(true);
  };

  return (
    <>
      <a href={loginUrl}>Login to Spotify</a>
      {console.log(loginRequested)}
      {console.log(loginUrl)}
    </>
  );
};

export default ApiTest;
