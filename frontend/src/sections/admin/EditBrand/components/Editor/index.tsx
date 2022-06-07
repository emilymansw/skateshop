import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../../shared/UI/SharedUI';
import { IBrandData } from '../../../../../types/brand';
import { usePutBrand } from '../../../../../api/APIService';
import { BrandForm } from '../../../shared/components/BrandForm';

interface ILocationStateData {
  brand: IBrandData;
}

export const Editor = () => {
  const location = useLocation();
  const { brand } = location.state as ILocationStateData;
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [putRequest, setPutRequest] = useState<IBrandData>();
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const { fetchData } = usePutBrand(brand.id.toString());

  useEffect(() => {
    if (brand) {
      setBannerUrl(brand.bannerUrl);
      setLogoUrl(brand.logoUrl);
      setBrandName(brand.name);
      setBrandDescription(brand.description);
      setPutRequest(brand);
    }
  }, [brand]);

  useEffect(() => {
    if (putRequest) {
      const putRequestUpdate = { ...putRequest };
      putRequestUpdate.bannerUrl = bannerUrl.trim();
      putRequestUpdate.logoUrl = logoUrl.trim();
      putRequestUpdate.name = brandName.trim();
      putRequestUpdate.description = brandDescription.trim();
      setPutRequest(putRequestUpdate);
    }
  }, [brandDescription, brandName, logoUrl, bannerUrl]);

  if (!putRequest) return <LoadingSpinner />;
  return (
    <BrandForm
      logoUrl={logoUrl}
      setLogoUrl={setLogoUrl}
      bannerUrl={bannerUrl}
      setBannerUrl={setBannerUrl}
      brandName={brandName}
      setBrandName={setBrandName}
      brandDescription={brandDescription}
      setBrandDescription={setBrandDescription}
      requestBody={putRequest}
      fetchData={fetchData}
      mode="edit"
    />
  );
};
