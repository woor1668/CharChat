import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import { Wrapper } from "@styles/HomeStyles";

export default function Home() {

  return (
    <Wrapper>
      <Navbar />
      <Outlet />
    </Wrapper>
  );
}
