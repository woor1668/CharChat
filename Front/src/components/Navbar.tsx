import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { logoutUser } from "@services/AuthService";

const Nav = styled.nav`
  width: 100%;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin-left: 30px;
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    background: #444;
    width: 100%;
    padding: 10px 0;
  }
`;

const NavItem = styled.li`
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 28px;
  cursor: pointer;
  margin-right: 30px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover{
    color: #ddd;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async() => {
    await logoutUser();
    navigate("/login");
    
  };

  return (
    <Nav>
      {/* 햄버거 버튼 (모바일 메뉴 토글) */}
      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </MenuToggle>

      {/* 네비게이션 메뉴 */}
      <NavList isOpen={menuOpen}>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <button
            onClick={handleLogout}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
          >
            Logout
          </button>
        </NavItem>
      </NavList>

      {/* 우측 프로필 아이콘 (마이 페이지 링크) */}
      <StyledLink to="/profile">
        <ProfileIcon />
      </StyledLink>
    </Nav>
  );
};

export default Navbar;
