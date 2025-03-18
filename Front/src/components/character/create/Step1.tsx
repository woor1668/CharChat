import { ButtonsContainer, CancelButton, FormContainer, FormSection, FormTitle, ImageGenerateButton, ImagePreview, ImageUploadButton, ImageUploadButtons, ImageUploadContainer, InfoText, MiniStudioIcon, MiniStudioLink, NameInput, NextButton, RandomizeButton, RequiredField, SectionDescription, SectionLabel, SectionNote, SmileIcon } from "@styles/character/create/Step1Styles";

export default function Step1() {
  return (
    <FormContainer>
      <FormTitle>프로필을 랜덤으로 생성해 보세요</FormTitle>
      <RandomizeButton>랜덤 생성</RandomizeButton>
      
      <InfoText>
        정보보호를 보호하기 위한 세이프티 필터 기능이 추가되었어요.<br />
        민감한 캐릭터의 경우 제작 시 설인인증이 필요해요.
      </InfoText>
      
      <FormSection>
        <SectionLabel>이미지 <RequiredField>*</RequiredField></SectionLabel>
        <SectionDescription>이미지를 필수로 등록해 주세요.</SectionDescription>
        <SectionNote>무작정한 이미지는 업로드가 제한됩니다.</SectionNote>
        
        <ImageUploadContainer>
          <ImagePreview>
            <SmileIcon>
              <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
              <div className="mouth"></div>
            </SmileIcon>
          </ImagePreview>
          
          <ImageUploadButtons>
            <ImageUploadButton>이미지 추가</ImageUploadButton>
            <ImageGenerateButton>이미지 생성</ImageGenerateButton>
          </ImageUploadButtons>
        </ImageUploadContainer>
        
        <MiniStudioLink>
          <MiniStudioIcon>🎨</MiniStudioIcon>
          <span>MINISTUDIO에서 이미지 제작하기</span>
          <span>→</span>
        </MiniStudioLink>
      </FormSection>
      
      <FormSection>
        <SectionLabel>이름 <RequiredField>*</RequiredField></SectionLabel>
        <SectionDescription>2~12자 이내로 입력해 주세요 (특수문자, 이모지 제외)</SectionDescription>
        <NameInput placeholder="캐릭터의 이름을 입력해 주세요" />
      </FormSection>
      
      <ButtonsContainer>
        <div>
          <CancelButton>설정 변경</CancelButton>
        </div>
        <NextButton>
          다음 <span style={{ marginLeft: '4px' }}>→</span>
        </NextButton>
      </ButtonsContainer>
    </FormContainer>
  );
};