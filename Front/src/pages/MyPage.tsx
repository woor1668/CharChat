import { Container } from '@styles/HomeStyles';
import { Section, SectionHeader, Content } from '@styles/MyPageStyles';
import MyInfo from '@components/myPage/MyInfo';
import MyApi from '@components/myPage/MyApi';
import MyRecords from '@components/myPage/MyRecords';
import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";
import { useState, useEffect } from 'react';

export default function MyPage() {
  const [activeApi, setActiveApi] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [showApi, setShowApi] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const [infoMaxHeight, setInfoMaxHeight] = useState("0px");
  const [apiMaxHeight, setApiMaxHeight] = useState("0px");
  const [recordsMaxHeight, setRecordsMaxHeight] = useState("0px");

  useEffect(() => {
    setInfoMaxHeight(showInfo ? "500px" : "0px");
  }, [showInfo]);

  useEffect(() => {
    setApiMaxHeight(showApi ? "500px" : "0px");
  }, [showApi]);

  useEffect(() => {
    setRecordsMaxHeight(showRecords ? "500px" : "0px");
  }, [showRecords]);

  return (
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

        <Section>
          <SectionHeader onClick={() => setShowRecords(!showRecords)}>
            기록
            {showRecords ? <TbCaretDownFilled/> : <TbCaretUpFilled/>}
          </SectionHeader>
          <Content maxHeight={recordsMaxHeight}>
            <MyRecords />
          </Content>
        </Section>
      </Container>
  );
}
