import { useState, useEffect } from 'react';
import { Tab, TabGrid } from '@styles/MyPageStyles';

export default function MyRecords() {
  const [studyRecords, setStudyRecords] = useState<string[]>([]);
  const [languageTab, setLanguageTab] = useState('English');
  const [categoryTab, setCategoryTab] = useState('All');

  // 데이터를 새로 조회하는 함수 (필요에 따라 API 호출 또는 필터링 로직 추가)
  const fetchStudyRecords = () => {
    // 예시: localStorage에서 데이터 읽기 (실제 서비스에서는 API 호출 등으로 대체)
    const records = JSON.parse(localStorage.getItem('study_records') || '[]');
    // languageTab, categoryTab 에 따른 필터링 로직 추가 가능
    setStudyRecords(records);
  };

  // 탭이나 셀렉트 변경 시마다 데이터를 새로 조회
  useEffect(() => {
    fetchStudyRecords();
  }, [languageTab, categoryTab]);

  return (
    <div>
      <h3>Study Records</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <TabGrid>
          {['English', 'Japanese', 'Chinese'].map((lang) => (
            <Tab
              key={lang}
              className={languageTab === lang ? 'active' : ''}
              onClick={() => setLanguageTab(lang)}
            >
              {lang}
            </Tab>
          ))}
        </TabGrid>
        {/* 우측에 카테고리 셀렉트를 배치 */}
        <div>
          <select
            value={categoryTab}
            onChange={(e) => setCategoryTab(e.target.value)}
          >
            {['All', 'Vocabulary', 'Conversation'].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {studyRecords.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul>
          {studyRecords.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
