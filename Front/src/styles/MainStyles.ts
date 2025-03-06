import styled from "styled-components";

export const NavList = styled.ul`
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 0;
    list-style: none;
`;

export const NavItem = styled.li`
    flex: 1;
    a {
        display: block;
        text-align: center;
        padding: 10px 20px;
        background-color: #444;
        color: white;
        border-radius: 5px;
        text-decoration: none;
        transition: background 0.3s ease;

        &:hover {
            background-color: #666;
      }
    }
`;