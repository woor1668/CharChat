import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from '@services/AuthService';
import { usePopup } from "./UsePopup";
import { usePasswordValidation } from "./UsePasswordValidation";

// 회원가입
export function useRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = usePopup();
  const navigate = useNavigate();

  const {
      password, setPassword,
      rePassword, setRePassword,
      showPassword, setShowPassword,
      showRePassword, setShowRePassword,
      isValPw, isCfPw,
  } = usePasswordValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!(isValPw && isCfPw)){
        showAlert({ message: "비밀번호 조건이 일치하지 않습니다." });
          return;
      } 

      if (!loading) {
          try {
              setLoading(true);
              await registerUser(name, email, password);
              await showAlert({ message: "회원가입 성공하였습니다.", header: "성공" });
              navigate("/login");
          } catch (err) {
              console.error(err);
              await showAlert({ message: "회원가입 실패하였습니다.", header: "실패" });
              setLoading(false);
          }
      }
  };

  return {
      name, setName,
      email, setEmail,
      password, setPassword,
      showPassword, setShowPassword,
      rePassword, setRePassword,
      showRePassword, setShowRePassword,
      isValPw, isCfPw, handleSubmit,
  };
}

//로그인
export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = usePopup();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!loading) {
          try {
              setLoading(true);
              await loginUser(email, password);
              navigate("/");
          } catch (err) {
              console.error(err);
              await showAlert({ message: "잘못된 정보입니다.", header: "로그인 실패" });
              setLoading(false);
          }
      }
  };

  return {
    email, setEmail,
      password, setPassword,
      showPassword, setShowPassword,
      handleSubmit,
  };
}
