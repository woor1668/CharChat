import { Outlet } from "react-router-dom";
import Navbar from "@components/common/Navbar";
import { HomeWrapper, OutletWrapper } from "@styles/HomeStyles";

export default function Home() {

  return (
    <HomeWrapper>
      <Navbar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </HomeWrapper>
  );
}
