import styled, { css } from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: auto;
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

export const FormAdvance = styled.div<{ maxHeight: string }>`
    max-height: ${({ maxHeight }) => maxHeight};
    overflow: hidden;
    transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
    opacity: ${({ maxHeight }) => (maxHeight === "0px" ? 0 : 1)};
`;

export const SectionLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

export const SectionDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 3px;
  margin-bottom: 4px;
`;

export const SectionNote = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 8px;
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

export const ImageUploadWarpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImageUploadButton = styled.button`
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
`;


const InputStyles = css`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &::placeholder {
    color: #aaa;
  }
`
export const TextInput = styled.input`
  ${InputStyles}
`;

export const TextArea = styled.textarea`
  ${InputStyles}
  height: 100px;
`;

export const InputCountWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 5px;
`;

export const InputCount = styled.div`
  font-size: 12px;
  color: #aaa;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledSelect = styled.select`
  ${InputStyles}
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8;%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23777' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
`;

export const DetailSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const AddButton = styled.button`
  background: #aaa;
  padding: 10px 15px;
  border-radius: 5px;
  `;

export const DeleteButton = styled.button`
  background: #aaa; 
  border-radius: 5px;
  border: none;
`;

export const ExampleContainer = styled.div`
  position: relative;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ExmpleHeader = styled.div`
  display: flex;
   justify-content: space-between;
   align-items: center;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ddd;
`


// Tab styling components
export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button<{active?: boolean}>`
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  background-color: ${props => props.active ? '#333' : '#f5f5f5'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 1px solid ${props => props.active ? '#333' : '#e0e0e0'};
  
  &:hover {
    background-color: ${props => props.active ? '#444' : '#e9e9e9'};
  }
`;

export const AddTabButton = styled.button`
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  color: #333;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  white-space: nowrap;

  span {
    font-size: 16px;
  }

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
      border-color: #ccc;
    }
  }
`;

export const DeleteTabButton = styled.button`
  background: #fff;
  width: 100%;
  border-radius: 5px;
  border: 1px solid tomato;
  color: tomato;
`;

export const ExampleWarpper = styled.div`
  display: flex;
`;