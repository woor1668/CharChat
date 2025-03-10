import { Outlet } from "react-router-dom";
import { HomeWrapper } from "@styles/HomeStyles";

export default function Home() {

  return (
    <HomeWrapper>
      <div>
        {/* {avatar ? <AvatarImg src={avatar} /> : <AvatarImg name="user" />} */}
        <div></div>
        <div></div>
      </div>
      <Outlet />
    </HomeWrapper>
  );
}
