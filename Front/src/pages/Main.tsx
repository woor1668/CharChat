import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import SliderForm from "@components/common/silder/Slider";
import { chatsAction, chatsComedy, chatsHorror } from "@components/common/silder/data";

const PageContainer = styled.div`
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

export default function Main() {
  return (
    <PageContainer>
      <SliderForm 
        chats={chatsAction} 
        title='테스트1'
        detailPath="/action-movie"
      />
      
      <SliderForm 
        chats={chatsComedy} 
        title='테스트2' 
        detailPath="/comedy-movie"
      />
      
      <SliderForm 
        chats={chatsHorror} 
        title='테스트2'
        detailPath="/horror-movie"
      />
    </PageContainer>
  );
};