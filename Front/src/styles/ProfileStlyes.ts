import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5em;
  font-weight: 900;
  padding: 20px;
  background-color: #fff;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-right: 20px;
  color: #aaa;
`;

export const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
`;

export const Body = styled.div`
  position: relative;
  padding: 20px;
  padding-bottom: 140px; /* 정렬 옵션이 표시될 공간 확보 */
  background-color: #fafafa;
  width: 100%;
  min-height: calc(100vh - 140px);
`;

export const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8em;
  color: #333;
`;

export const Total = styled.p`
  margin: 5px 0 0;
  font-size: 1em;
  color: #666;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const Sorting = styled.p`
  cursor: pointer;
  font-size: 1.2em;
  color: #007bff;
  margin: 0;
`;

export const SortOptions = styled.div`
  position: absolute;
  top: 10;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column; /* 옵션들을 세로로 정렬 */
  align-items: center;
  padding: 15px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

export const SortButton = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  background: none;
  color: #444;
  font-size: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 1em;
  transition: background 0.2s ease;
  &:hover {
    background: none !important;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
