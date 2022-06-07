import { useEffect, useState } from 'react';
import { usePostBrand } from '../../../../../api/APIService';
import { BrandForm } from '../../../shared/components/BrandForm/index';

interface IPostRequestData {
  name: undefined | string;
  description: undefined | string;
  logoUrl: undefined | string;
  bannerUrl: undefined | string;
}
export const CreateForm = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [postRequest, setPostRequest] = useState<IPostRequestData>({
    name: undefined,
    description: undefined,
    logoUrl: undefined,
    bannerUrl: undefined,
  });
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const { fetchData, loading: postLoading, data: postData } = usePostBrand();

  useEffect(() => {
    const postRequestUpdate = { ...postRequest };
    postRequestUpdate.bannerUrl = bannerUrl.trim();
    postRequestUpdate.logoUrl = logoUrl.trim();
    postRequestUpdate.name = brandName.trim();
    postRequestUpdate.description = brandDescription.trim();
    setPostRequest(postRequestUpdate);
  }, [brandDescription, brandName, logoUrl, bannerUrl]);

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
      requestBody={postRequest}
      fetchData={fetchData}
      mode="create"
    />
  );
};
