import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5em;
  font-weight: 900;
  padding: 20px;
  margin: 20px;
  background-color: #fff;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileWrapper = styled.div`
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
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
`;

export const BioWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  /* margin-bottom: 10px; */
  border: 1px solid #ddd;
  text-align: left;
`

export const Body = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
  min-height: calc(100vh - 140px);
`;

export const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  border-bottom: 1px solid #ddd;
`;

const BodyHeaderLine = styled.div`
  display: flex;
  flex-direction: column;
`

export const HeaderLeft = styled(BodyHeaderLine)``;

export const HeaderRight = styled(BodyHeaderLine)`
  align-items: center;
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

export const Sorting = styled.p<{ showSortOptions: boolean }>`
  cursor: pointer;
  font-size: 0.9em;
  padding: 10px;
  margin: 0;
  background-color: ${(props) => (props.showSortOptions ? "#ddd" : "transparent")};
`;

export const SortOptions = styled.div`
  position: absolute;
  top: 1;
  right: 0;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  &:hover {
    background: #ddd !important;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
