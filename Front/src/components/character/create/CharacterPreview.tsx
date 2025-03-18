import { CharacterDescription, CharacterImage, CharacterImageContainer, CharacterName, 
        PreviewContainer, PreviewInfo, PreviewTitle, SmileIcon 
} from '@styles/character/create/CharacterPreviewStyles';
export default function CharacterPreview() {
  return (
    <PreviewContainer>
      <PreviewTitle>캐릭터 미리보기</PreviewTitle>
      <CharacterImageContainer>
        <CharacterImage>
          <SmileIcon>
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="mouth"></div>
          </SmileIcon>
        </CharacterImage>
      </CharacterImageContainer>
      
      <PreviewInfo>
        <CharacterName>캐릭터 이름</CharacterName>
        <CharacterDescription>캐릭터 한 줄 소개</CharacterDescription>
      </PreviewInfo>
    </PreviewContainer>
  );
};
