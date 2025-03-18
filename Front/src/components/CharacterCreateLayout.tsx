import { Outlet } from "react-router-dom";

export function CharacterCreateLayout() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: '#f1f1f1', padding: '1rem' }}>
          <h2>캐릭터 만들기</h2>
        </header>
        <Outlet />
      </div>
    );
  }