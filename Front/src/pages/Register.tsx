import { InputWrapper, Input, Button, Wrapper, Form, IconWrapper, Container, StyledLink } from "@styles/AuthStyles";
import { FaUser, FaEnvelope, FaIdCard  } from "react-icons/fa";
import { useRegisterForm } from "@hooks/UseAuthForm";
import PasswordInput, { PasswordForm } from "@components/Password";

export default function Register() {
  const { name, setName, email, setEmail, nickName, setNickName,
          password, setPassword, showPassword, setShowPassword,
          rePassword, setRePassword, showRePassword, setShowRePassword,
          isValPw, isCfPw, handleSubmit 
        } = useRegisterForm();

  return (
    <Wrapper>
      <Container>
        <h2>회원가입</h2>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <IconWrapper><FaUser /></IconWrapper>
            <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
          </InputWrapper>

          <InputWrapper>
            <IconWrapper><FaEnvelope /></IconWrapper>
            <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </InputWrapper>
          
          <InputWrapper>
            <IconWrapper><FaIdCard /></IconWrapper>
            <Input type="nickname" placeholder="닉네임" value={nickName} onChange={(e) => setNickName(e.target.value)} required maxLength={10}/>
          </InputWrapper>
          
          <PasswordInput 
            password={password} 
            setPassword={setPassword} 
            showPassword={showPassword} 
            setShowPassword={setShowPassword} 
            placeholder="비밀번호"
          />

          <PasswordInput 
            password={rePassword} 
            setPassword={setRePassword} 
            showPassword={showRePassword} 
            setShowPassword={setShowRePassword} 
            placeholder="비밀번호 확인"
          />
          <Button type="submit">회원가입</Button>
        </Form>
        <PasswordForm
          password= {password}
          isValPw = {isValPw}
          isCfPw = {isCfPw}
        />
        <p>
          계정이 있으신가요? <StyledLink to="/login">로그인</StyledLink>
        </p>
      </Container>
    </Wrapper>
  );
}
