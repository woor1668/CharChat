import { RequiredMark, StepIcon, StepItem as StepItemStyled, StepLabel, StepNavContainer } from "@styles/character/create/CharacterNaviStyles";

interface StepItem {
  label: string;
  path: string;
  isRequired: boolean;
}

interface CharacterNaviProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepChange: (stepIndex: number) => void;
}

export default function CharacterNavi({ steps, currentStepIndex, onStepChange }: CharacterNaviProps) {
  console.log(steps);
  return (
    <StepNavContainer>
      {steps.map((step, index) => (
        <StepItemStyled 
          isActive={index === currentStepIndex}
          onClick={() => onStepChange(index)}
        >
          <StepIcon 
            isActive={index === currentStepIndex} 
            isCompleted={index < currentStepIndex}
          >
            {index < currentStepIndex ? '✓' : ''}
          </StepIcon>

          <StepLabel isActive={index === currentStepIndex}>
            {step.label}
            {step.isRequired && <RequiredMark>*</RequiredMark>}
          </StepLabel>
          
        </StepItemStyled>
      ))}
    </StepNavContainer>
  );
}
