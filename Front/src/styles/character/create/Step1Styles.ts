import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
`;

export const FormTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const RandomizeButton = styled.button`
  background-color: #4e93e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const InfoText = styled.p`
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 24px;
  position: relative;
  padding-right: 32px;
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const SectionLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

export const RequiredField = styled.span`
  color: red;
`;

export const SectionDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

export const SectionNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 12px;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const SmileIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .eyes {
    display: flex;
    width: 40px;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .eye {
    width: 8px;
    height: 8px;
    background-color: #888;
    border-radius: 50%;
  }
  
  .mouth {
    width: 30px;
    height: 15px;
    border-bottom: 3px solid #888;
    border-radius: 0 0 15px 15px;
  }
`;

export const ImageUploadButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImageUploadButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
`;

export const ImageGenerateButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

export const MiniStudioLink = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #f0f8ff;
  font-size: 12px;
  color: #4e93e2;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
`;

export const MiniStudioIcon = styled.span`
  font-size: 16px;
  margin-right: 6px;
`;

export const NameInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &::placeholder {
    color: #aaa;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;
`;

export const NextButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 24px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
`;