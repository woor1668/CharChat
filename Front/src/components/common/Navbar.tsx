import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { logoutUser } from "@services/AuthService";
import { MenuToggle, Nav, NavItem, NavList, ProfileIcon, StyledLink } from "@styles/common/NavBarStyles";

export default function Navbar() {
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