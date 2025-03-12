import Modal from "@components/common/Modal";
import MyPage from "./MyPage";
import { useState, useRef, useEffect, useCallback } from "react";
import { useUserInfo } from "@hooks/UseProfile";
import { 
  Body, BodyHeader, Button, Header, ProfileImg, ProfileWapper, Total, UserInfo, 
  Sorting, SortOptions, SortButton, HeaderLeft, Title, HeaderRight 
} from "@styles/ProfileStlyes";
import { FaUser } from "react-icons/fa";

export default function Home() {
  const { info } = useUserInfo() ?? {};
  const [sortOption, setSortOption] = useState("popular");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMypage, setShowMypage] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  // ✅ useCallback으로 리렌더링 최적화
  const handleSortClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSortOptions((prev) => !prev);
  }, []);

  const handleSortOptionChange = useCallback((option: string) => {
    setSortOption(option);
    setShowSortOptions(false);
  }, []);

  useEffect(() => {
    if (!showSortOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSortOptions]);

  return (
    <>
      <Header>
        <UserInfo>
          <ProfileWapper>
            {info?.profileUrl ? <ProfileImg src={info.profileUrl} /> : <FaUser />}
          </ProfileWapper>
          <div>{info?.nickName}</div>
        </UserInfo>
        <Button onClick={() => setShowMypage(true)}>수정</Button>
      </Header>
      <div>{info?.bio}</div>
      <Body>
        <BodyHeader>
          <HeaderLeft>
            <Title>작품 리스트</Title>
            <Total>총 0개</Total>
          </HeaderLeft>
          <HeaderRight>
            <Sorting 
              onClick={handleSortClick} 
              showSortOptions={showSortOptions}
            >
              정렬 : {sortOption === "popular" ? "인기순" : sortOption === "newest" ? "최신순" : "오래된순"}
            </Sorting>
          </HeaderRight>
        </BodyHeader>
        {showSortOptions && (
          <SortOptions ref={sortRef}>
            <SortButton onClick={() => handleSortOptionChange("popular")}>인기순</SortButton>
            <SortButton onClick={() => handleSortOptionChange("newest")}>최신순</SortButton>
            <SortButton onClick={() => handleSortOptionChange("oldest")}>오래된순</SortButton>
          </SortOptions>
        )}
      </Body>
      <Modal isOpen={showMypage} onClose={() => setShowMypage(false)} title="마이페이지">
        <MyPage/>
      </Modal>
    </>
  );
}
