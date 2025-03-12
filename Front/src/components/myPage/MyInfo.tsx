import { ApiWrapper, InfoItem, InfoButton, ButtonDiv, 
        AvatarWapper, AvatarUpload, AvatarInput, AvatarImg,
        InfoInput,
        InfoTextArea, 
       } 
from "@styles/MyPageStyles";
import { useMyInfo } from "@hooks/UseMyPage";
import PasswordInput, { PasswordForm } from "../common/Password";
import { FaUser } from "react-icons/fa";
import { ProfileWapper } from "@styles/ProfileStlyes";

export default function MyInfo() {
  const { info, isCfPw, isValPw, showPwInput,
          password, setPassword, showPassword, setShowPassword,
          rePassword, setRePassword, showRePassword, setShowRePassword,
          handleAvatarChange, handlePasswordChange, handleSave
        } = useMyInfo() ?? {};

  if (!info) {
    return <ApiWrapper>정보를 불러올 수 없습니다.</ApiWrapper>; // ✅ 데이터가 없는 경우
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <ApiWrapper>
      <AvatarWapper>
          <AvatarUpload htmlFor="avatar" title="이미지 올리기">
            <ProfileWapper>
              {info.profileUrl ? <AvatarImg src={info.profileUrl} /> : <FaUser />}
            </ProfileWapper>
          </AvatarUpload>
          <AvatarInput onChange={handleAvatarChange} id="avatar" type="file" accept="image/*" />
      </AvatarWapper>
      <div><strong>닉네임</strong></div> 
      <InfoItem onKeyDown={handleKeyDown}>
          <InfoInput 
            type="text" 
            value={info.nickName}
            required
            maxLength={10}
          />
      </InfoItem>
      <div><strong>자기소개</strong></div> 
      <InfoItem>
          <InfoTextArea 
            value={info.bio}
            required
            maxLength={100}
          />
      </InfoItem>
      {showPwInput ? (
        <>
          <div><strong>비밀번호 변경</strong></div> 
          <InfoItem onKeyDown={handleKeyDown}>
            <PasswordInput 
              password={password ?? ""} 
              setPassword={setPassword ?? (() => {})} 
              showPassword={showPassword ?? false} 
              setShowPassword={setShowPassword?? (() => {})} 
              placeholder="비밀번호"
            />
          </InfoItem>
          <InfoItem onKeyDown={handleKeyDown}>
            <PasswordInput 
              password={rePassword ?? ""} 
              setPassword={setRePassword ?? (() => {})} 
              showPassword={showRePassword ?? false} 
              setShowPassword={setShowRePassword ?? (() => {})} 
              placeholder="비밀번호 확인"
              />
          </InfoItem>
          <PasswordForm
            password= {password}
            isValPw = {isValPw}
            isCfPw = {isCfPw}
          />
        </>
      ) : (
        false
      )}
      <ButtonDiv>
        <InfoButton onClick={handlePasswordChange}>{showPwInput ? '취소' : '비밀번호 변경'}</InfoButton>
        <InfoButton onClick={handleSave}>저장</InfoButton>
      </ButtonDiv>
    </ApiWrapper>
  );
}
