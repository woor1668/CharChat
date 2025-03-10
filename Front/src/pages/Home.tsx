import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import { HomeWrapper } from "@src/styles/HomeStyles";

export default function Home() {

  return (
    <HomeWrapper>
      <Navbar />
      <Outlet />
    </HomeWrapper>
  );
}
