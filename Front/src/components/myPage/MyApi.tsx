import { ApiContainer, H, P, HeaderRow, InputWrapper, ToggleBall, ToggleSwitch, ApiButton, ApiInput } from "@styles/MyPageStyles";
import { useMyApi } from "@hooks/UseMyPage";

interface MyApiProps {
  title: string;
  activeApi: string;
  setActiveApi: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyApi({ title, activeApi, setActiveApi }: MyApiProps) {
  const { apiKey, setApiKey, err, isValid, handleSave, handleToggle, isDisabled } = useMyApi(title, activeApi, setActiveApi);
  const isActive = activeApi === title;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <ApiContainer>
      <HeaderRow>
        <H>{title}</H>
        <ToggleSwitch active={isActive} onClick={handleToggle} disabled={!apiKey || !isValid || isDisabled}>
          <ToggleBall active={isActive} />
        </ToggleSwitch>
      </HeaderRow>
      <InputWrapper>
        <ApiInput
          type="password"
          placeholder={`Enter ${title} API Key`}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ApiButton onClick={handleSave}>Save API</ApiButton>
      </InputWrapper>
      {err && <P style={{ color: "red" }}>{err}</P>}
    </ApiContainer>
  );
}