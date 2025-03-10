import { Container, HomeWrapper } from '@styles/HomeStyles';
import { Section, SectionHeader, Content } from '@styles/MyPageStyles';
import MyInfo from '@components/myPage/MyInfo';
import MyApi from '@components/myPage/MyApi';
import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";
import { useState, useEffect } from 'react';

export default function MyPage() {
  const [activeApi, setActiveApi] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [showApi, setShowApi] = useState(false);

  const [infoMaxHeight, setInfoMaxHeight] = useState("0px");
  const [apiMaxHeight, setApiMaxHeight] = useState("0px");

  useEffect(() => {
    setInfoMaxHeight(showInfo ? "500px" : "0px");
  }, [showInfo]);

  useEffect(() => {
    setApiMaxHeight(showApi ? "500px" : "0px");
  }, [showApi]);

  return (
    <HomeWrapper>
      <Container>
        <h2>My Page</h2>

        <Section>
          <SectionHeader onClick={() => setShowInfo(!showInfo)}>
            내 정보
            {showInfo ? <TbCaretDownFilled/> : <TbCaretUpFilled/>}
          </SectionHeader>
          <Content maxHeight={infoMaxHeight}>
            <MyInfo />
          </Content>
        </Section>

        <Section>
          <SectionHeader onClick={() => setShowApi(!showApi)}>
            내 API
            {showApi ? <TbCaretDownFilled/> : <TbCaretUpFilled/>}
          </SectionHeader>
          <Content maxHeight={apiMaxHeight}>
            <MyApi title="OpenAI" activeApi={activeApi} setActiveApi={setActiveApi} />
            <MyApi title="Gemini" activeApi={activeApi} setActiveApi={setActiveApi} />
            <MyApi title="Claude" activeApi={activeApi} setActiveApi={setActiveApi} />
          </Content>
        </Section>
      </Container>
    </HomeWrapper>
  );
}
