import { useEffect, useState } from 'react';
import { 
  BackButton, 
  Container, 
  ContentArea, 
  Header, 
  HeaderLeft, 
  HeaderRight, 
  MainContent, 
  PageTitle, 
  PreviewSidebar, 
  SaveButton 
} from '@styles/character/create/CharacterCreatorStyles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CharacterNavi from '@create/CharacterNavi';
import CharacterFooter from '@create/CharacterFooter';
import CharacterPreview from '@create/CharacterPreview';
import { getStep } from '@services/character/create/CharacterCreateService';

interface StepData {
  label: string;
  path: string;
  isRequired: boolean;
}

export default function CharacterCreator() {
  const [steps, setSteps] = useState<StepData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchSteps() {
      try {
        const data = await getStep();
        const stepsData = Array.isArray(data.steps) ? data.steps : [data.steps];
        const fetchedSteps = stepsData.map((item: StepData) => ({
          label: item.label,
          path: item.path,
          isRequired: !!item.isRequired,
        }));
        setSteps(fetchedSteps);
      } catch (error) {
        console.error('단계 데이터를 불러오는데 실패했습니다:', error);
      }
    }
    fetchSteps();
  }, []);

  // URL 경로를 통해 현재 활성화된 단계를 판단합니다.
  const currentStepIndex = steps.findIndex(step =>
    location.pathname.includes(step.path)
  );

  const handleStepChange = (newStepIndex: number) => {
    if (newStepIndex >= 0 && newStepIndex < steps.length) {
      // 새로운 단계의 경로로 이동
      navigate(`/character/create/${steps[newStepIndex].path}`);
    }
  };
  
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton>←</BackButton>
          <PageTitle>캐릭터 만들기</PageTitle>
        </HeaderLeft>
        <HeaderRight>
          <SaveButton>저장</SaveButton>
        </HeaderRight>
      </Header>
      
      <ContentArea>
        <MainContent>
          <CharacterNavi 
            steps={steps} 
            currentStepIndex={currentStepIndex} 
            onStepChange={handleStepChange} 
          />
          <Outlet />
          <CharacterFooter 
            currentStepIndex={currentStepIndex} 
            onStepChange={handleStepChange} 
            totalSteps={steps.length} 
          />
        </MainContent>
        
        <PreviewSidebar>
          <CharacterPreview />
        </PreviewSidebar>
      </ContentArea>
    </Container>
  );
}
