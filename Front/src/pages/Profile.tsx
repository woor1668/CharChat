import Modal from "@components/common/Modal";
import MyPage from "./MyPage";
import { useUserInfo } from "@hooks/UseProfile";
import { 
  Body, BodyHeader, Button, Header, ProfileImg, ProfileWapper, Total, UserInfo, 
  Sorting, SortOptions, SortButton, HeaderLeft, Title, HeaderRight 
} from "@styles/ProfileStlyes";
import { FaUser } from "react-icons/fa";
import { ModalProvider } from "@context/ModalContext";

export default function Home() {
  const {
    info, ProfileUrl, 
    sortOption, showSortOptions, sortRef,
    handleSortClick, handleSortOptionChange,
    showMypage, setShowMypage,
  } = useUserInfo();

  return (
    <>
      <Header>
        <UserInfo>
          <ProfileWapper>
            {ProfileUrl ? <ProfileImg src={ProfileUrl} /> : <FaUser />}
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
            <Button>캐릭터 생성</Button>
            <Sorting onClick={handleSortClick} showSortOptions={showSortOptions}>
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
      <ModalProvider onClose={() => setShowMypage(false)}>
        <Modal isOpen={showMypage} title="마이페이지">
          <MyPage />
        </Modal>
      </ModalProvider>
    </>
  );
}
