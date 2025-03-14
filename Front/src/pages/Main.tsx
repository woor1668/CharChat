import React, { useRef, useCallback, useState, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

// ------------------- 타입 정의 -------------------
export interface Movie {
  id: number;
  name: string;
  context: string;
  release_date: string;
  image_url?: string;
}

export interface ThemeType {
  title: string;
}

// ------------------- 샘플 데이터 -------------------
const sampleMovies: Movie[] = [
  { id: 1, name: "Movie 1", context: "줄거리", release_date: "2020-01-01" },
  { id: 2, name: "Movie 2", context: "줄거리", release_date: "2020-01-02" },
  { id: 3, name: "Movie 3", context: "줄거리", release_date: "2020-01-03" },
  { id: 4, name: "Movie 4", context: "줄거리", release_date: "2020-01-04" },
  { id: 5, name: "Movie 5", context: "줄거리", release_date: "2020-01-05" },
  { id: 6, name: "Movie 6", context: "줄거리", release_date: "2020-01-06" },
  { id: 7, name: "Movie 7", context: "줄거리", release_date: "2020-01-07" },
  { id: 8, name: "Movie 8", context: "줄거리", release_date: "2020-01-08" },
  { id: 9, name: "Movie 9", context: "줄거리", release_date: "2020-01-09" },
  { id: 10, name: "Movie 10", context: "줄거리", release_date: "2020-01-10" },
];

const sampleTheme: ThemeType = { title: "내 맘대로 즐기는 텍스트 게임" };

// ------------------- styled-components -------------------
/** 전체 래퍼 */
const MainBoxContainer = styled.div`
  max-width: 100%;
  padding: 0 20px;
`;

/** 제목 */
const Title = styled.h2`
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
`;

/** 슬라이더 컨테이너 */
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

/** 카드 스타일 */
const FilmItem = styled.div`
  width: 200px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto;
  text-align: left;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const FilmImage = styled.div`
  width: 100%;
  border-radius: 8px;
  position: relative;
  padding-top: 100%;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out;
`;

/** 카드 내용(제목, 날짜 등) */
const FilmContent = styled.div`
  padding: 10px;

  h4 {
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: #666;
    margin: 0;
  }
`;

/** 공통 버튼 스타일 */
const BtnStyle = css`
  position: absolute;
  top: 50%;
  font-size: 1.2rem;
  color: #555;
  width: 32px;
  height: 32px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 50%;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

/** 이전 버튼 */
export const PrevButton = styled(GrFormPrevious)`
  ${BtnStyle}
  left: 0;      
  transform: translate(-33%, -50%); 
`;

/** 다음 버튼 */
export const NextButton = styled(GrFormNext)`
  ${BtnStyle}
  right: 0;
  transform: translate(33%, -50%);
`;

/** 페이드 오버레이 공통 */
const OverlayStyle = css`
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

// 좌측 페이드 오버레이
const FadeOverlayLeft = styled.div`
  ${OverlayStyle}
  left: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

// 우측 페이드 오버레이
const FadeOverlayRight = styled.div`
  ${OverlayStyle}
  right: 0;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

// ------------------- Film 컴포넌트 -------------------
const Film = memo(({ movie, onClick }: { movie: Movie; onClick: (id: number) => void }) => {
  const handleClick = useCallback(() => {
    onClick(movie.id);
  }, [movie.id, onClick]);

  return (
    <FilmItem onClick={handleClick}>
      <FilmImage style={{ backgroundImage: movie.image_url ? `url(${movie.image_url})` : 'none' }} />
      <FilmContent>
        <h4>{movie.name}</h4>
        <p>{movie.context}</p>
        <p>{movie.release_date}</p>
      </FilmContent>
    </FilmItem>
  );
});

Film.displayName = 'Film';

// ------------------- NavigationElement 컴포넌트 -------------------
const NavigationElement = memo(({ 
  isVisible,
  direction,
  onClick 
}: { 
  isVisible: boolean;
  direction: 'prev' | 'next';
  onClick: () => void;
}) => {
  return (
    <>
      {direction === 'prev' ? (
        <>
          <PrevButton 
            onClick={isVisible ? onClick : undefined} 
            style={{ opacity: isVisible ? 1 : 0, zIndex: isVisible ? 1 : -1}} 
          />
          <FadeOverlayLeft style={{ opacity: isVisible ? 1 : 0 }} />
        </>
      ) : (
        <>
          <NextButton 
            onClick={isVisible ? onClick : undefined} 
            style={{ opacity: isVisible ? 1 : 0, zIndex: isVisible ? 1 : -1 }} 
          />
          <FadeOverlayRight style={{ opacity: isVisible ? 1 : 0 }} />
        </>
      )}
    </>
  );
});

NavigationElement.displayName = 'NavigationElement';

// ------------------- MainBox 컴포넌트 (슬라이더) -------------------
export interface MainBoxProps {
  movies: Movie[];
  theme: ThemeType;
}

export const MainBox = memo(({ movies, theme }: MainBoxProps) => {
  const navigate = useNavigate();
  const slickRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 5;

  const prev = useCallback(() => {
    if (slickRef.current) slickRef.current.slickPrev();
  }, []);

  const next = useCallback(() => {
    if (slickRef.current) slickRef.current.slickNext();
  }, []);

  // 슬라이드 아이템 클릭 핸들러
  const handleMovieClick = useCallback((id: number) => {
    navigate(`/movie/${id}`);
  }, [navigate]);

  // 넘길 페이지가 있는지 판단
  const hasPrev = currentSlide > 0;
  const hasNext = currentSlide < movies.length - slidesToShow;

  // Slider settings을 useMemo로 최적화
  const settings = useMemo(() => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 3,
    arrows: false,
    swipe: true,
    draggable: true,
    afterChange: (index: number) => setCurrentSlide(index),
    lazyLoad: 'ondemand' as const,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }), [slidesToShow]);

  return (
    <MainBoxContainer>
      <Title>{theme.title}</Title>
      <SliderContainer>
        <Slider ref={slickRef} {...settings}>
          {movies.map((movie) => (
            <Film key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </Slider>
        
        <NavigationElement isVisible={hasPrev} direction="prev" onClick={prev} />
        <NavigationElement isVisible={hasNext} direction="next" onClick={next} />
      </SliderContainer>
    </MainBoxContainer>
  );
});

MainBox.displayName = 'MainBox';

// ------------------- 기본 내보내기 -------------------
const MainComponent: React.FC = () => {
  const movieData = useMemo(() => sampleMovies, []);
  const themeData = useMemo(() => sampleTheme, []);
  
  return <MainBox movies={movieData} theme={themeData} />;
};

export default MainComponent;