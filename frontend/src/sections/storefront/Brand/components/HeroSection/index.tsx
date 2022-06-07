import { TitleContainer, LogoWrapper, BrandName, Divider } from './styles';
import { BannerImg } from '../../../../shared/UI/SharedUI';
import { IBrandData } from '../../../../../types/brand';

export const HeroSection = ({
  brand: { bannerUrl, logoUrl, name, description },
}: {
  brand: IBrandData;
}) => (
  <div>
    <BannerImg src={bannerUrl} alt="brandBanner" />
    <TitleContainer>
      <LogoWrapper>
        <img src={logoUrl} alt="brandLogo" />
      </LogoWrapper>
      <BrandName>{name}</BrandName>
    </TitleContainer>
    <div>
      <p>{description}</p>
    </div>
    <Divider />
  </div>
);
