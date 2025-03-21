import { getLst } from "@services/character/create/CharacterCreateService";
import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { 
  FormContainer, FormSection, InputCount, InputCountWrapper, 
  SectionDescription, SectionLabel, StyledSelect, TextArea, 
  TextInput
} from "@styles/character/create/Step1Styles";
import { useState, useEffect } from "react";
interface LstData {
  label: string;
  path: string;
}

export default function Step2() {
  const [tplts, setTplts] = useState<LstData[]>([]);
  const [models, setModels] = useState<LstData[]>([]);
  const [info, setInfo] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  const heightValue = selectedTemplate === 'custom' ? '200px' : '170px';
  const maxLen = selectedTemplate === 'custom' ? 4000 : 3000;
  useEffect(() => {
    async function fetchTplts() {
      try {
        const data = await getLst("tplt");
        const tpltsData = Array.isArray(data.lst) ? data.lst : [data.lst];
        const fetchedTpls = tpltsData.map((item: LstData) => ({
          label: item.label,
          path: item.path,
        }));
        setTplts(fetchedTpls);

        // 기본 선택값 설정
        if (fetchedTpls.length) {
          setSelectedTemplate(fetchedTpls[0].path);
        }
      } catch (error) {
        console.error("단계 데이터를 불러오는데 실패했습니다:", error);
      }
    }
    fetchTplts();
  }, []);

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getLst("modl");
        const modelsData = Array.isArray(data.lst) ? data.lst : [data.lst];
        if(modelsData){
          const fetchedModels = modelsData.map((item: LstData) => ({
            label: item.label,
            path: item.path,
          }));
          setModels(fetchedModels);
  
          // 기본 선택값 설정
          if (fetchedModels.length) {
            setSelectedModel(fetchedModels[0].path);
          }
        }else{
          setModels([]);
          setSelectedModel("내 정보에서 API를 키를 등록해주세요");

        }
      } catch (error) {
        console.error("단계 데이터를 불러오는데 실패했습니다:", error);
      }
    }
    fetchModels();
  }, []);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfo(e.target.value);
  };

  return (
    <FormContainer>
      <FormSection>
        <SectionLabel>
          프롬프트 템플릿 <RequiredMark>*</RequiredMark>
        </SectionLabel>
        <SectionDescription>
          캐릭터의 목적에 맞는 템플릿을 선택해 주세요.<br/>
          템플릿을 변경해도 입력하신 내용이 사라지지 않아요.
        </SectionDescription>

        <StyledSelect 
          value={selectedTemplate} 
          onChange={handleTemplateChange}
        >
          {tplts.map((option) => (
            <option key={option.path} value={option.path}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormSection>

      <FormSection>
        <SectionLabel>
          AI 모델
        </SectionLabel>
        <SectionDescription>
          캐릭터에 사용될 AI 모델을 선택해 주세요.
        </SectionDescription>

        {selectedModel ?
        <StyledSelect 
          value={selectedModel} 
          onChange={handleModelChange}
        >
          {models.map((option) => (
            <option key={option.path} value={option.path}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        :
        <TextInput
          value={"내 정보에서 API를 키를 등록해주세요"}
          disabled
        />
        }
      </FormSection>

      <FormSection>
        <SectionLabel>
          캐릭터 설정 및 정보 <RequiredMark>*</RequiredMark>
          <SectionDescription>
          역할, 외모, 성격, 말투 등 캐릭터의 더 자세한 정보를 입력해 주세요
        </SectionDescription>
        </SectionLabel>
        <TextArea
          style={{ height: heightValue }}
          value={info}
          onChange={handleInfoChange}
          maxLength={maxLen}
        />
        <InputCountWrapper>
          <InputCount>{info.length} / {maxLen}</InputCount>
        </InputCountWrapper>
      </FormSection>
    </FormContainer>
  );
}