import { RequiredMark, StepIcon, StepItem, StepLabel, StepNavContainer } from "@styles/character/create/CharacterNaviStyles";

interface StepItem {
  id: string;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  isRequired?: boolean;
}


export default function CharacterNavi() {
  const steps: StepItem[] = [
    { id: 'profile', label: '프로필', isActive: true, isCompleted: false, isRequired: true },
    { id: 'details', label: '상세 설정', isActive: false, isCompleted: false, isRequired: true },
    { id: 'services', label: '시작 설정', isActive: false, isCompleted: false, isRequired: true },
    { id: 'media', label: '미디어', isActive: false, isCompleted: false },
    { id: 'guidebook', label: '가이드북', isActive: false, isCompleted: false },
    { id: 'registration', label: '등록', isActive: false, isCompleted: false, isRequired: true },
  ];

  return (
    <StepNavContainer>
      {steps.map((step) => (
        <StepItem key={step.id} isActive={step.isActive}>
          <StepIcon isActive={step.isActive} isCompleted={step.isCompleted}>
            {step.isCompleted ? '✓' : ''}
          </StepIcon>
          <StepLabel isActive={step.isActive}>{step.label}</StepLabel>
          {step.isRequired && <RequiredMark>*</RequiredMark>}
        </StepItem>
      ))}
    </StepNavContainer>
  );
};
