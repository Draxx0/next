import { redirect } from "next/navigation";

const Home = () => {
  return redirect("/posts");
};

export default Home;
