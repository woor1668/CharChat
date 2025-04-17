import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import * as St from "@styles/character/create/Step1Styles";
import React, { useState, useRef } from "react";
import { FaTrash, FaTimesCircle } from "react-icons/fa";

export default function Step4() {
  // Example default images
  const defaultImages = [
    {
      id: "default-1",
      src: "/placeholder-classroom.jpg",
      label: "교실",
      subLabel: "교실로 이동한 상황",
      isDefault: true
    },
    {
      id: "default-2",
      src: "/placeholder-anime-character.jpg",
      label: "메이브 본느",
      subLabel: "메이브가 핵심 상황",
      isDefault: true
    }
  ];

  // State to track uploaded images
  const [uploadedImages, setUploadedImages] = useState<Array<any>>([]);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  
  // Hidden file input reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload button click
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  // Process file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each uploaded file
    const newImages = Array.from(files).map((file) => {
      const imageUrl = URL.createObjectURL(file);
      return {
        id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        src: imageUrl,
        label: file.name.split('.')[0],
        subLabel: "",
        isDefault: false,
        file: file,
        hasInfo: false
      };
    });

    // Add new images to state
    setUploadedImages([...uploadedImages, ...newImages]);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle image deletion
  const handleDeleteImage = (id: string) => {
    // Filter out the deleted image
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
  };

  // Open modal for image info
  const handleInfoClick = (image: any) => {
    setEditingImage(image);
    setImageTitle(image.label || "");
    setImageDescription(image.subLabel || "");
    setIsModalOpen(true);
  };

  // Handle image click
  const handleImageClick = (image: any) => {
    if (image.hasInfo) {
      handleInfoClick(image);
    }
  };

  // Save image info
  const handleSaveInfo = () => {
    const updatedImages = uploadedImages.map(img => {
      if (img.id === editingImage.id) {
        return {
          ...img,
          label: imageTitle,
          subLabel: imageDescription,
          hasInfo: true
        };
      }
      return img;
    });
    
    setUploadedImages(updatedImages);
    setIsModalOpen(false);
    setEditingImage(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingImage(null);
  };

  // Determine which images to display
  const displayedImages = uploadedImages.length > 0 ? uploadedImages : defaultImages;

  return (
    <St.FormContainer>
      <St.Header>
        <div>
          <St.SectionLabel>상황 이미지 <RequiredMark>*</RequiredMark></St.SectionLabel>
          <St.SectionDescription>상황에 어울리는 인물, 배경 등의 이미지를 등록해 보세요 (최대 30개)</St.SectionDescription>
        </div>
        <St.ButtonWrapper>
          <St.ImageAddButton onClick={handleAddImageClick}>
            이미지 추가
          </St.ImageAddButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
        </St.ButtonWrapper>
      </St.Header>

      <St.FormSection>
        <St.ImageSelectionContainer>
          <St.ImagePreviewGrid>
            {displayedImages.map((image) => (
              <St.ImagePreviewCard key={image.id} onClick={() => handleImageClick(image)}>
                <St.PreviewImage src={image.src} alt={image.label} />
                <St.ControlsOverlay>
                  
                  {image.isDefault && (
                  <div>
                    <St.PreviewLabel>{image.label}</St.PreviewLabel>
                      <St.PreviewSubLabel>{image.subLabel}</St.PreviewSubLabel>
                  </div>
                  )}
                  {!image.isDefault && (
                    <St.DeleteButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image.id);
                      }}
                      aria-label="삭제"
                    >
                      <FaTrash />
                      <span>삭제</span>
                    </St.DeleteButton>
                  )}
                  
                  {!image.isDefault && (
                    <St.InfoButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInfoClick(image);
                      }}
                    >
                      {image.hasInfo ? "수정" : "정보 입력"}
                    </St.InfoButton>
                  )}
                </St.ControlsOverlay>
              </St.ImagePreviewCard>
            ))}
          </St.ImagePreviewGrid>
        </St.ImageSelectionContainer>
      </St.FormSection>

      {/* Modal for image editing */}
      {isModalOpen && editingImage && (
        <St.Modal>
          <St.ModalContent>
            <St.ModalHeader>
              <h2>이미지 등록</h2>
              <St.CloseButton onClick={handleCloseModal}>
                <FaTimesCircle />
              </St.CloseButton>
            </St.ModalHeader>
            
            <St.ModalBody>
              <St.ModalImageSection>
                <St.ModalImage src={editingImage.src} alt={editingImage.label} />
                <St.ImageChangeButton>이미지 변경</St.ImageChangeButton>
              </St.ModalImageSection>
              
              <St.ModalFormSection>
                <St.FormGroup>
                  <St.FormLabel>이미지 이름 <RequiredMark>*</RequiredMark></St.FormLabel>
                  <St.FormDescription>이미지를 어떤 이름으로 부르고 싶으신지 입력주세요</St.FormDescription>
                  <St.TextInput 
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="놀라"
                    maxLength={20}
                  />
                  <St.InputCountWrapper>
                    <St.InputCount>{imageTitle.length} / 20</St.InputCount>
                  </St.InputCountWrapper>
                </St.FormGroup>
                
                <St.FormGroup>
                  <St.FormLabel>상황 <RequiredMark>*</RequiredMark></St.FormLabel>
                  <St.FormDescription>작성하신 상황이 되면 AI가 자동으로 이미지를 띄워드려요</St.FormDescription>
                  <St.TextArea 
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    placeholder="고양이 마루가 놀라는 상황"
                    maxLength={50}
                  />
                  <St.InputCountWrapper>
                    <St.InputCount>{imageDescription.length} / 50</St.InputCount>
                  </St.InputCountWrapper>
                </St.FormGroup>
              </St.ModalFormSection>
            </St.ModalBody>
            
            <St.ModalFooter>
              <St.CancelButton onClick={handleCloseModal}>닫기</St.CancelButton>
              <St.SaveButton onClick={handleSaveInfo}>등록</St.SaveButton>
            </St.ModalFooter>
          </St.ModalContent>
        </St.Modal>
      )}
    </St.FormContainer>
  );
};