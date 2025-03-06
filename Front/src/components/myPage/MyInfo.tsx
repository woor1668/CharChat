import { ApiWrapper, InfoItem, SelectBox, InfoButton, Strong, ButtonDiv } from "@styles/MyPageStyles";
import { useMyInfo } from "@hooks/UseMyPage";
import PasswordInput, { PasswordForm } from "../Password";

export default function MyInfo() {
  const { info, isCfPw, isValPw, loading, 
          selectedLang, showPwInput,
          password, setPassword, showPassword, setShowPassword,
          rePassword, setRePassword, showRePassword, setShowRePassword,
          handleLangChange, handlePasswordChange, handleSave
        } = useMyInfo() ?? {};

  if (loading) {
    return <ApiWrapper>로딩 중...</ApiWrapper>; // ✅ 로딩 상태 표시
  }

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
      <InfoItem>
        <Strong>이름</Strong> {info.name}
      </InfoItem>
      <InfoItem>
        <Strong>아이디</Strong> {info.id}
      </InfoItem>
      <InfoItem>
        <Strong>이메일</Strong> {info.email}
      </InfoItem>
      <InfoItem>
        <Strong>언어</Strong>
        <SelectBox value={selectedLang} onChange={handleLangChange}>
          <option value="eng">영어</option>
          <option value="jpn">일본어</option>
          <option value="chn">중국어</option>
        </SelectBox>
      </InfoItem>
        {showPwInput ? (
          <>
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
