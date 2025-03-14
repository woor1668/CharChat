import { useCallback } from "react";
import { SlideWapper, SlideImage, SlideContent, Title, Summary, Creator, SlideImageForm } from '@styles/common/SliderStyles';
import { Chat } from "./Slider";

interface SliderItemsProps {
  chat: Chat;
  onClick: (id: number) => void;
}

export default function SliderItems({ chat, onClick }: SliderItemsProps) {
  const handleClick = useCallback(() => {
    onClick(parseInt(chat.id, 10)); // id를 number로 변환
  }, [chat.id, onClick]);

  return (
    <SlideWapper onClick={handleClick}>
      <SlideImageForm>
        {chat.image_url && <SlideImage src={chat.image_url}/>}
      </SlideImageForm>
      <SlideContent>
        <Title>{chat.title}</Title>
        <Summary>{chat.summary}</Summary>
        <Creator>{chat.creator}</Creator>
      </SlideContent>
    </SlideWapper>
  );
}
