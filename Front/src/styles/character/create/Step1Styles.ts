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

/////4
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ImageSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

export const ImagePreviewGrid = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
`;

export const ImagePreviewCard = styled.div`
  position: relative;
  width: 180px;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const PreviewImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const PreviewLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 12px 12px 4px 12px;
`;

export const PreviewSubLabel = styled.div`
  font-size: 12px;
  color: #666;
  padding: 0 12px 12px 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const ImageAddButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ddd;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;


// Add these to your Step1Styles.ts file

export const ControlsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
`;

export const InfoButton = styled.button`
  padding: 6px 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #333;
  }
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #888;
  
  &:hover {
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ModalImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
`;

export const ImageChangeButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

export const ModalFormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FormDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #eee;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #444;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }
`;
