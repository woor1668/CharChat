import { RequiredMark } from "@styles/character/create/CharacterNaviStyles";
import { 
  FormContainer, FormSection, InputCount, InputCountWrapper,
  TextInput, SectionDescription, SectionLabel, TextArea,
  TabContainer, TabButton, AddTabButton,
  DeleteTabButton, FormAdvance, DetailSection,
  AddButton, ExampleContainer,
  DeleteButton,
  ExampleWarpper
} from "@styles/character/create/Step1Styles";
import { useEffect, useState } from "react";
import { TbCaretDownFilled, TbCaretUpFilled } from "react-icons/tb";

interface SettingType {
  id: number;
  title: string;
  name: string;
  greeting: string;
  situation: string;
}

interface ExampleAnswers {
  answer: string;
}

export default function Step3() {
  const [settings, setSettings] = useState<SettingType[]>([
    {
      id: 0,
      title: "기본 설정",
      name: "",
      greeting: "",
      situation: ""
    }
  ]);
  const [exampleAnswers, setExampleAnswers] = useState<Record<number, ExampleAnswers[]>>({
    0: [{ answer: "" }]
  });
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showAdvance, setShowAdvance] = useState(false);
  const [advanceMaxHeight, setAdvanceMaxHeight] = useState("0px");

  const maxAnswerLen = 200;

  useEffect(() => {
    setAdvanceMaxHeight(showAdvance ? "500px" : "0px");
  }, [showAdvance]);

  const addSetting = () => {
    const newId = settings.length;
    const newSetting: SettingType = {
      id: newId,
      title: `추가설정 ${newId}`,
      name: "",
      greeting: "",
      situation: ""
    };
    setSettings([...settings, newSetting]);
    setExampleAnswers({
      ...exampleAnswers,
      [newId]: [{ answer: "" }]
    });
    setActiveTab(newId);
  };

  const updateSettingName = (id: number, value: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, name: value } : setting
    ));
  };

  const updateGreeting = (id: number, value: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, greeting: value } : setting
    ));
  };

  const updateSituation = (id: number, value: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, situation: value } : setting
    ));
  };

  const handleDeleteSetting = () => {
    if (activeSetting.id === 0) return;

    const deletedId = activeSetting.id;

    const updatedSettings = settings
      .filter(setting => setting.id !== deletedId)
      .map(setting => {
        if (setting.id > deletedId) {
          const newId = setting.id - 1;
          let newTitle = setting.title;
          const match = setting.title.match(/^추가설정 (\d+)$/);
          if (match) {
            newTitle = `추가설정 ${Number(match[1]) - 1}`;
          }
          return { ...setting, id: newId, title: newTitle };
        }
        return setting;
      });

    const newExampleAnswers: Record<number, ExampleAnswers[]> = {};
    Object.entries(exampleAnswers).forEach(([key, value]) => {
      const numericKey = Number(key);
      if (numericKey === deletedId) return;
      if (numericKey > deletedId) {
        newExampleAnswers[numericKey - 1] = value;
      } else {
        newExampleAnswers[numericKey] = value;
      }
    });

    setSettings(updatedSettings);
    setExampleAnswers(newExampleAnswers);
    setActiveTab(prev => Math.max(prev - 1, 0));
  };

  const addExampleAnswers = () => {
    const current = exampleAnswers[activeTab] || [];
    if (current.length < 3) {
      setExampleAnswers({
        ...exampleAnswers,
        [activeTab]: [...current, { answer: "" }]
      });
    }
  };

  const removeExampleAnswers = (index: number) => {
    const current = exampleAnswers[activeTab] || [];
    const updated = [...current];
    updated.splice(index, 1);
    setExampleAnswers({
      ...exampleAnswers,
      [activeTab]: updated
    });
  };

  const handleUserMessageChange = (index: number, value: string) => {
    const current = exampleAnswers[activeTab] || [];
    const updated = current.map((item, i) =>
      i === index ? { ...item, answer: value } : item
    );
    setExampleAnswers({
      ...exampleAnswers,
      [activeTab]: updated
    });
  };

  const activeSetting = settings.find(setting => setting.id === activeTab) || settings[0];

  return (
    <div>
      {/* Tabs navigation */}
      <TabContainer>
        {settings.map((setting) => (
          <TabButton
            key={setting.id}
            active={activeTab === setting.id}
            onClick={() => setActiveTab(setting.id)}
          >
            {setting.title}
          </TabButton>
        ))}
        {settings.length < 3 &&
          <AddTabButton onClick={addSetting}>
            <span>+</span> 설정 추가
          </AddTabButton>
        }
      </TabContainer>

      {/* Form for the active setting */}
      <FormContainer>
        <FormSection>
          <SectionLabel>첫 인사말 <RequiredMark>*</RequiredMark></SectionLabel>
          <SectionDescription>캐릭터의 첫 인사말, 상황, 설정 등을 작성해 주세요</SectionDescription>
          <TextArea
            placeholder="자동 생성 기능을 활용하면 AI가 초안을 작성해 드려요"
            value={activeSetting.greeting}
            onChange={(e) => updateGreeting(activeSetting.id, e.target.value)}
            maxLength={500}
          />
          <InputCountWrapper>
            <InputCount>{activeSetting.greeting.length} / 500</InputCount>
          </InputCountWrapper>
        </FormSection>

        <FormSection>
          <SectionLabel>시작설정 이름 <RequiredMark>*</RequiredMark></SectionLabel>
          <SectionDescription>시작설정의 이름을 작성해 주세요</SectionDescription>
          <TextInput
            placeholder="상황, 등장인물 등"
            value={activeSetting.name}
            onChange={(e) => updateSettingName(activeSetting.id, e.target.value)}
            maxLength={12}
          />
          <InputCountWrapper>
            <InputCount>{activeSetting.name.length} / 12</InputCount>
          </InputCountWrapper>
        </FormSection>

        <FormSection>
          <SectionLabel>시작 상황</SectionLabel>
          <SectionDescription>대화를 위한 캐릭터와 사용자의 상황 정보를 입력해주세요</SectionDescription>
          <TextArea
            placeholder="사용자의 역할, 캐릭터와의 관계, 이야기가 시작되는 세계관 등"
            value={activeSetting.situation}
            onChange={(e) => updateSituation(activeSetting.id, e.target.value)}
            maxLength={1000}
          />
          <InputCountWrapper>
            <InputCount>{activeSetting.situation.length} / 1000</InputCount>
          </InputCountWrapper>
        </FormSection>

        <FormSection>
          <SectionLabel onClick={() => setShowAdvance(!showAdvance)}>
            고급 설정 {showAdvance ? <TbCaretDownFilled /> : <TbCaretUpFilled />}
          </SectionLabel>
          <FormAdvance maxHeight={advanceMaxHeight}>
            <SectionLabel>추천 답변</SectionLabel>
            <DetailSection>
              <SectionDescription>
                사용자들에게 첫 답변을 추천해 보세요. 등록하지 않는 경우 AI가 자동으로 생성해 드려요. (최대 3개)
              </SectionDescription>
              {exampleAnswers[activeTab]?.length < 3 && (
                <AddButton onClick={addExampleAnswers}>답변 추가</AddButton>
              )}
            </DetailSection>

            {(exampleAnswers[activeTab] || []).map((dialogue, index) => (
              <ExampleContainer key={index} style={{background: 'none', marginBottom: '0'}}>
                <ExampleWarpper>
                  <TextInput
                    placeholder={`추천 답변 ${index + 1}`}
                    value={dialogue.answer}
                    onChange={(e) => handleUserMessageChange(index, e.target.value)}
                    maxLength={maxAnswerLen}
                    />
                  <DeleteButton
                  onClick={() => removeExampleAnswers(index)} 
                  style={{background: 'none', color:'#aaa', fontSize: '1.2em'}}
                  >-</DeleteButton>
                </ExampleWarpper>
                <InputCountWrapper>
                  <InputCount>{dialogue.answer.length} / {maxAnswerLen}</InputCount>
                </InputCountWrapper>
              </ExampleContainer>
            ))}
          </FormAdvance>
        </FormSection>

        <FormSection>
          {activeSetting.id !== 0 && (
            <DeleteTabButton onClick={handleDeleteSetting}>설정 삭제</DeleteTabButton>
          )}
        </FormSection>
      </FormContainer>
    </div>
  );
}
