import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [search] = useSearchParams();
  const code = search.get("code")!;
  const state = search.get("state")!;
  const params: Record<string, string> = {
    code,
    state,
  };

  useEffect(() => {
    fetch("http://localhost:3001/callback?" + new URLSearchParams(params)).then(
      (res) => console.log(res)
    );
  }, []);

  return <div>Welcome</div>;
};

export default Home;
