import { BackButton, Container, ContentArea, Header, MainContent, PageTitle, PreviewSidebar, SaveButton } from '@styles/character/create/CharacterCreatorStyles';
import Step1 from '@components/character/create/Step1';
import CharacterNavi from '@components/character/create/CharacterNavi';
import CharacterPreview from '@components/character/create/CharacterPreview';
import { HeaderLeft, HeaderRight } from '@styles/ProfileStlyes';

export default function CharacterCreator() {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton>
            ←
          </BackButton>
          <PageTitle>캐릭터 만들기</PageTitle>
        </HeaderLeft>
        <HeaderRight>
          <SaveButton>저장</SaveButton>
        </HeaderRight>
      </Header>
      
      <ContentArea>
        <MainContent>
          <CharacterNavi />
          <Step1 />
        </MainContent>
        
        <PreviewSidebar>
          <CharacterPreview />
        </PreviewSidebar>
      </ContentArea>
    </Container>
  );
}