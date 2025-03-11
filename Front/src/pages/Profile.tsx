import { useState } from "react";
import { HomeWrapper } from "@styles/HomeStyles";
import { useUserInfo } from "@hooks/UseProfile";
import { Body, BodyHeader, Button, Header, ProfileImg, ProfileWapper, Sorting, Total, UserInfo, SortOptions, SortButton, HeaderLeft, Title, HeaderRight } from "@styles/ProfileStlyes";
import { FaUser } from "react-icons/fa";

export default function Home() {
  const { info } = useUserInfo() ?? {};
  const [sortOption, setSortOption] = useState("popular"); // 기본 정렬: 인기순
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSortClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
    // 작품 리스트를 선택한 옵션에 맞게 정렬하는 로직 추가
  };

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
      <Body>
        <BodyHeader>
          <HeaderLeft>
            <Title>작품 리스트</Title>
            <Total>총 0개</Total>
          </HeaderLeft>
          <HeaderRight>
            <Sorting onClick={handleSortClick}>
              정렬 : {sortOption === "popular" ? "인기순" : sortOption === "newest" ? "최신순" : "오래된순"}
            </Sorting>
          </HeaderRight>
        </BodyHeader>
        {showSortOptions && (
          <SortOptions>
            <SortButton onClick={() => handleSortOptionChange("popular")}>인기순</SortButton>
            <SortButton onClick={() => handleSortOptionChange("newest")}>최신순</SortButton>
            <SortButton onClick={() => handleSortOptionChange("oldest")}>오래된순</SortButton>
          </SortOptions>
        )}
        {/* 작품 리스트 컴포넌트를 선택한 정렬 옵션에 따라 렌더링 */}
      </Body>
    </HomeWrapper>
  );
}
