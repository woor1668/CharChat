import { Outlet } from "react-router-dom";
import { HomeWrapper } from "@styles/HomeStyles";
import { useUserInfo } from "@hooks/UseProfile";
import { Button, Header, ProfileImg, ProfileWapper, UserInfo } from "@styles/ProfileStlyes";
import { FaUser } from "react-icons/fa";

export default function Home() {
  const { info } = useUserInfo() ?? {};
    
    return (
        <HomeWrapper>
            <Header>
                <UserInfo>
                    <ProfileWapper>
                        {info?.profileUrl ? <ProfileImg src={info.profileUrl} /> : <FaUser />}
                    </ProfileWapper>
                    <div>{info?.nickName}</div>
                </UserInfo>
                <Button>수정</Button>
            </Header>
            <Outlet />
        </HomeWrapper>
    );
}
