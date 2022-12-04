import { useEffect, useState } from "react";

const ApiTest = () => {
  const [data, setData] = useState<{ message: string }>({ message: "" });

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setData({ message: data.message }));
  }, []);

  return <>{data.message === "" ? <h1>Loading...</h1> : <h1>Success</h1>}</>;
};

export default ApiTest;
