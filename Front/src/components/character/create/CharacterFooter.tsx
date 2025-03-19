import { ButtonsContainer, NextButton, PrevButton } from "@styles/character/create/CharacterFooterStyles";

interface CharacterFooterProps {
  currentStepIndex: number;
  onStepChange: (stepIndex: number) => void;
  totalSteps: number;
}

export default function CharacterFooter({ currentStepIndex, onStepChange, totalSteps }: CharacterFooterProps) {
    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) {
            onStepChange(currentStepIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            onStepChange(currentStepIndex - 1);
        }
    };
  return (
    <ButtonsContainer index={currentStepIndex}>
        {currentStepIndex > 0 && (
          <PrevButton onClick={handlePrev}>
              ← 이전
          </PrevButton>
        )}
        {currentStepIndex < totalSteps - 1 && (
          <NextButton onClick={handleNext}>
              다음 →
          </NextButton>
        )}
    </ButtonsContainer>
  );
}
