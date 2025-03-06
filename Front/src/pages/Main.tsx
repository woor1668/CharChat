import { Link, useSearchParams } from "react-router-dom";
import { Container } from "@styles/HomeStyles";
import { useEffect } from "react";
import { NavItem, NavList } from "@src/styles/MainStyles";

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setSearchParams({ lang });
    }
  }, [setSearchParams]);

  return (
    <Container>
      <h1>Study App</h1>
      <p>Select a language: {searchParams}</p>

      <p>Select a study mode:</p>
      <NavList>
        <NavItem>
          <Link to={`/word?${searchParams}`}>단어쓰기</Link>
        </NavItem>
        <NavItem>
          <Link to={`/speak?${searchParams}`}>말하기</Link>
        </NavItem>
        <NavItem>
          <Link to={`/conversation?${searchParams}`}>회화</Link>
        </NavItem>
      </NavList>
    </Container>
  );
}
