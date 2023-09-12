import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./Carousel.styles";

const BoardCarousel = () => {
  const { t } = useTranslation("boarding");

  const settings = {
    dots: true,
    centerMode: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Styled.BoardSlider {...settings}>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("언제든 목적에 맞게")}</Text>
            <Text size="titleMedium">{t("참여 모드 변경")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board1.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("오른쪽은 찜 왼쪽은 패스")}</Text>
            <Text size="titleMedium">{t("간편 스와이프 탐색")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board2.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("더 알고 싶은 개발자 및 프로젝트는")}</Text>
            <Text size="titleMedium">{t("상세 정보 확인")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board3.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("찜 목록에서")}</Text>
            <Text size="titleMedium">{t("빠른 대화 요청")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board4.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("채팅창에서")}</Text>
            <Text size="titleMedium">{t("성공적인 팀원 매칭")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board5.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
        <div>
          <Styled.TextWrapper>
            <Text size="titleSmall">{t("마이페이지에서")}</Text>
            <Text size="titleMedium">{t("간편하게 프로젝트 단계 관리")}</Text>
          </Styled.TextWrapper>
          <FlexCenter>
            <Styled.ImageContainer>
              <Image src="/images/board6.png" layout="fill" objectFit="contain" alt="board" />
            </Styled.ImageContainer>
          </FlexCenter>
        </div>
      </Styled.BoardSlider>
    </div>
  );
};

export default BoardCarousel;
