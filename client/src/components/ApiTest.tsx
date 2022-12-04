import { useEffect, useState } from "react";

const ApiTest = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    console.log(data);
  }, []);

  return <>{data ? data : <h1>Waiting</h1>}</>;
};

export default ApiTest;
