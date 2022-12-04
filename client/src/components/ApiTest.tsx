import React, { useEffect, useState } from "react";

const ApiTest = () => {
  const [loginRequested, setLoginRequested] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3001/login").then((res) => console.log(res));
  }, [loginRequested]);

  const loginRequestHandler = () => {
    setLoginRequested(true);
  };

  return (
    <>
      <form action="http://localhost:8080/login" onSubmit={loginRequestHandler}>
        <input type="submit" value="Login with Spotify" />
      </form>
      {console.log(loginRequested)}
    </>
  );
};

export default ApiTest;
