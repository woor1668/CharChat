import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { 
  FormContainer, FormSection, InputCount, InputCountWarpper, 
  SectionDescription, SectionLabel, SummaryInput 
} from "@styles/character/create/Step1Styles";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownIcon = styled.span`
  font-size: 12px;
  color: #777;
`;

const CustomDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const options = [
  { value: "basic", label: "기본", description: "AI가 다양한 상황을 폭넓게 이해하고 답해요" },
  { value: "roleplay", label: "1:1 롤플레잉", description: "AI가 사람처럼 대화하고 감정을 표현해요" },
  { value: "simulation", label: "시뮬레이션", description: "AI가 게임이나 여러 캐릭터들을 등장시키는 상황을 잘 만들어요" },
  { value: "productivity", label: "생산성", description: "AI가 전문 지식을 바탕으로 유용한 답을 해요" },
  { value: "custom", label: "제작자 커스텀", description: "제작자가 직접 AI에게 모든 지시사항을 입력하는 고급 커스텀이에요" },
];

export default function Step2() {
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState("basic");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <FormContainer>
      
      <FormSection>
        <SectionLabel>
          프롬프트 템플릿 <RequiredMark>*</RequiredMark>
        </SectionLabel>
        <SectionDescription>캐릭터의 목적에 맞는 템플릿을 선택해 주세요.</SectionDescription>
        <SectionDescription>템플릿을 변경해도 입력하신 내용이 사라지지 않아요.</SectionDescription>

        <SelectContainer ref={dropdownRef}>
          <StyledSelect onClick={() => setIsOpen(!isOpen)}>
            {options.find((option) => option.value === selected)?.label || "선택하세요"}
            <DropdownIcon>▼</DropdownIcon>
          </StyledSelect>

          <CustomDropdown isOpen={isOpen}>
            {options.map((option) => (
              <DropdownItem key={option.value} onClick={() => handleSelect(option.value)}>
                <div>
                  <strong>{option.label}</strong>
                  <div style={{ fontSize: "12px", color: "#777" }}>{option.description}</div>                
                </div>
              </DropdownItem>
            ))}
          </CustomDropdown>
        </SelectContainer>
      </FormSection>
      
      <FormSection>
        <SectionLabel>
          한 줄 소개 <RequiredMark>*</RequiredMark>
        </SectionLabel>
        <SummaryInput 
          placeholder="어떤 캐릭터인지 간단한 소개를 입력해 주세요" 
          value={summary}
          onChange={handleSummaryChange}
          maxLength={250}
        />
        <InputCountWarpper>
          <InputCount>
            {summary.length} / 250
          </InputCount>
        </InputCountWarpper>
      </FormSection>
    </FormContainer>
  );
}
