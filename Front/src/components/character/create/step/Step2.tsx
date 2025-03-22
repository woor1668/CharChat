import { getLst } from "@services/character/create/CharacterCreateService";
import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { 
  FormAdvance,
  FormContainer, FormSection, InputCount, InputCountWrapper, 
  SectionDescription, SectionLabel, StyledSelect, TextArea, 
  TextInput
} from "@styles/character/create/Step1Styles";
import { useState, useEffect } from "react";
import { TbCaretDownFilled, TbCaretUpFilled, TbTrash } from "react-icons/tb";

interface LstData {
  label: string;
  path: string;
}

interface ExampleDialogue {
  user: string;
  character: string;
}

export default function Step2() {
  const [tplts, setTplts] = useState<LstData[]>([]);
  const [models, setModels] = useState<LstData[]>([]);
  const [info, setInfo] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showAdvance, setShowAdvance] = useState(false);
  const [exampleDialogues, setExampleDialogues] = useState<ExampleDialogue[]>([
    { user: "", character: "" }
  ]);

  const heightValue = selectedTemplate === 'custom' ? '200px' : '170px';
  const maxLen = selectedTemplate === 'custom' ? 4000 : 3000;
  const maxDialogueLen = 500;

  const [advanceMaxHeight, setAdvanceMaxHeight] = useState("0px");

  useEffect(() => {
    setAdvanceMaxHeight(showAdvance ? "650px" : "0px");
  }, [showAdvance]);
  
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

  const handleUserMessageChange = (index: number, value: string) => {
    const updatedDialogues = [...exampleDialogues];
    updatedDialogues[index].user = value;
    setExampleDialogues(updatedDialogues);
  };

  const handleCharacterMessageChange = (index: number, value: string) => {
    const updatedDialogues = [...exampleDialogues];
    updatedDialogues[index].character = value;
    setExampleDialogues(updatedDialogues);
  };

  const addExampleDialogue = () => {
    if (exampleDialogues.length < 3) {
      setExampleDialogues([...exampleDialogues, { user: "", character: "" }]);
    }
  };

  const removeExampleDialogue = (index: number) => {
    const updatedDialogues = [...exampleDialogues];
    updatedDialogues.splice(index, 1);
    setExampleDialogues(updatedDialogues);
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

        {models.length > 0 ?
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
            value="내 정보에서 API를 키를 등록해주세요"
            disabled
          />
        }
      </FormSection>

      <FormSection>
        <SectionLabel>
          캐릭터 설정 및 정보 <RequiredMark>*</RequiredMark>
        </SectionLabel>
        <SectionDescription>
          역할, 외모, 성격, 말투 등 캐릭터의 더 자세한 정보를 입력해 주세요
        </SectionDescription>
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

      <FormSection>
        <SectionLabel onClick={() => setShowAdvance(!showAdvance)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          고급 설정
          {showAdvance ? <TbCaretDownFilled/> : <TbCaretUpFilled/>}
        </SectionLabel>
        <FormAdvance maxHeight={advanceMaxHeight}>
          <SectionLabel>
            예시대화
          </SectionLabel>
          <SectionDescription>
            예시 대화를 입력해서 캐릭터의 완성도를 높여보세요.<br/>
            예시는 3개까지 등록할 수 있어요.
          </SectionDescription>
          
          {exampleDialogues.map((dialogue, index) => (
            <div key={index} style={{ marginBottom: '20px', position: 'relative', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>예시 {index + 1}</span>
                <button 
                  onClick={() => removeExampleDialogue(index)} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  <TbTrash />
                  <span>삭제</span>
                </button>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    재팍
                  </div>
                </div>
                <TextArea
                  placeholder="사용자들이 캐릭터에게 보낼 메세지"
                  value={dialogue.user}
                  onChange={(e) => handleUserMessageChange(index, e.target.value)}
                  maxLength={maxDialogueLen}
                  style={{ height: '100px', marginBottom: '5px' }}
                />
                <InputCountWrapper>
                  <InputCount>{dialogue.user.length} / {maxDialogueLen}</InputCount>
                </InputCountWrapper>
              </div>
              
              <div>
                <TextArea
                  placeholder="캐릭터가 답할 메세지"
                  value={dialogue.character}
                  onChange={(e) => handleCharacterMessageChange(index, e.target.value)}
                  maxLength={maxDialogueLen}
                  style={{ height: '100px', marginBottom: '5px' }}
                />
                <InputCountWrapper>
                  <InputCount>{dialogue.character.length} / {maxDialogueLen}</InputCount>
                </InputCountWrapper>
              </div>
            </div>
          ))}
          
          {exampleDialogues.length < 3 && (
            <button 
              onClick={addExampleDialogue}
              style={{
                background: '#f0f0f0',
                border: '1px dashed #ccc',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              예시 추가
            </button>
          )}
        </FormAdvance>
      </FormSection>
    </FormContainer>
  );
}