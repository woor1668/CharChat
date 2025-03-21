import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { FormContainer, FormSection,
         InputCount, InputCountWrapper, 
         TextInput, SectionDescription, SectionLabel, SectionNote, 
         TextArea} from "@styles/character/create/Step1Styles";
import { useState } from "react";

export default function Step6() {
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
      
      {/* <InfoText>
        정보보호를 보호하기 위한 세이프티 필터 기능이 추가되었어요.<br />
        민감한 캐릭터의 경우 제작 시 설인인증이 필요해요.
        <CancelButton>설정 변경</CancelButton>
      </InfoText> */}
      
      <FormSection>
        <SectionLabel>이미지 <RequiredMark>*</RequiredMark></SectionLabel>
        <SectionDescription>이미지를 필수로 등록해 주세요.</SectionDescription>
        <SectionNote>무작정한 이미지는 업로드가 제한됩니다.</SectionNote>
        
      </FormSection>
      
      <FormSection>
        <SectionLabel>이름 <RequiredMark>*</RequiredMark></SectionLabel>
        <SectionDescription>2~12자 이내로 입력해 주세요 (특수문자, 이모지 제외)</SectionDescription>
        <TextInput 
          placeholder="캐릭터의 이름을 입력해 주세요"
          value={name}
          onChange={handleNameChange}
          maxLength={12}
        />
        <InputCountWrapper>
          <InputCount>
            {name.length} / 12
          </InputCount>
        </InputCountWrapper>
      </FormSection>
      
      <FormSection>
        <SectionLabel>한 줄 소개 <RequiredMark>*</RequiredMark></SectionLabel>
          <TextArea 
            placeholder="어떤 캐릭터인지 간단한 소개를 입력해 주세요" 
            value={summary}
            onChange={handleSummaryChange}
            maxLength={250}
          />
          <InputCountWrapper>
          <InputCount>
            {summary.length} / 250
          </InputCount>
        </InputCountWrapper>
      </FormSection>
    </FormContainer>
  );
};