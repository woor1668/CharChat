import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { FormContainer, FormSection,
         InputCount, InputCountWarpper, 
         NameInput, SectionDescription, SectionLabel,
         Select,
         SummaryInput} from "@styles/character/create/Step1Styles";
import { useState } from "react";

export default function Step2() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };
  return (
    <FormContainer>
      
      <FormSection>
        <SectionLabel>프롬프트 템플릿<RequiredMark>*</RequiredMark></SectionLabel>
        <SectionDescription>캐릭터의 목적에 맞는 템플릿을 선택해 주세요.</SectionDescription>
        <SectionDescription>템플릿을 변경해도 입력하신 내용이 사라지지 않아요.</SectionDescription>

        <Select></Select>
      </FormSection>
      
      <FormSection>
        <SectionLabel>이름 <RequiredMark>*</RequiredMark></SectionLabel>
        <SectionDescription>2~12자 이내로 입력해 주세요 (특수문자, 이모지 제외)</SectionDescription>
        <NameInput 
          placeholder="캐릭터의 이름을 입력해 주세요"
          value={name}
          onChange={handleNameChange}
          maxLength={12}
        />
        <InputCountWarpper>
          <InputCount>
            {name.length} / 12
          </InputCount>
        </InputCountWarpper>
      </FormSection>
      
      <FormSection>
        <SectionLabel>한 줄 소개 <RequiredMark>*</RequiredMark></SectionLabel>
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
};