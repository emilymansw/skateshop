import React, { SetStateAction, useState } from 'react';
import { Button, FormContainer } from '../../../../shared/UI/SharedUI';
import { Logo, Banner } from './styles';
import { hasNullProperty } from '../../../../../utils/helperFunctions';

interface IPostRequestData {
  name: undefined | string;
  description: undefined | string;
  logoUrl: undefined | string;
  bannerUrl: undefined | string;
}
export const BrandForm = ({
  logoUrl,
  setLogoUrl,
  bannerUrl,
  setBannerUrl,
  brandName,
  setBrandName,
  brandDescription,
  setBrandDescription,
  requestBody,
  fetchData,
  mode,
}: {
  logoUrl: string;
  setLogoUrl: React.Dispatch<SetStateAction<string>>;
  bannerUrl: string;
  setBannerUrl: React.Dispatch<SetStateAction<string>>;
  brandName: string;
  setBrandName: React.Dispatch<SetStateAction<string>>;
  brandDescription: string;
  setBrandDescription: React.Dispatch<SetStateAction<string>>;
  requestBody: IPostRequestData;
  fetchData: (
    fetchPath: string,
    fetchParams: object,
    fetchRequestData: object
  ) => void;
  mode: string;
}) => {
  const [logoImage, setLogoImage] = useState<File>();
  const [bannerImage, setBannerImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  const uploadImage = (
    image: File,
    setUrl: (url: string) => void,
    setEmptyFile: React.Dispatch<SetStateAction<File | undefined>>
  ) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'skateshop');
    formData.append('cloud_name', 'drvuz5jme');
    fetch('  https://api.cloudinary.com/v1_1/drvuz5jme/upload', {
      method: 'post',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data: { url: string }) => {
        setUrl(data.url);
        setLoading(false);
        setEmptyFile(undefined);
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <h2>{mode === 'create' ? <>Create Brand</> : <>Edit Brand</>}</h2>
      <h4>Name:</h4>
      <input
        type="text"
        value={brandName}
        onChange={(e) => {
          setBrandName(e.target.value);
        }}
      />
      <h4>Description:</h4>
      <textarea
        value={brandDescription}
        onChange={(e) => {
          setBrandDescription(e.target.value);
        }}
      />
      <h4>Logo:</h4>
      {logoUrl && <Logo src={logoUrl} alt={brandName} />}
      <br />
      {logoImage && <p>{logoImage.name}</p>}
      <label>
        <input
          type="file"
          onChange={(e) => setLogoImage(e.target.files![0]!)}
        />
        <span className="file">Choose file</span>
      </label>
      {logoImage && (
        <Button
          onClick={() => {
            uploadImage(logoImage, setLogoUrl, setLogoImage);
          }}
          disabled={loading}
        >
          Upload new logo
        </Button>
      )}

      <h4>Banner:</h4>
      {bannerUrl && <Banner src={bannerUrl} alt={brandName} />}
      <br />
      {bannerImage && <p>{bannerImage.name}</p>}
      <label>
        <input
          type="file"
          onChange={(e) => setBannerImage(e.target.files![0]!)}
        />
        <span className="file">Choose file</span>
      </label>
      {bannerImage && (
        <Button
          type="submit"
          onClick={() => {
            uploadImage(bannerImage, setBannerUrl, setBannerImage);
          }}
          disabled={loading}
        >
          Upload new banner
        </Button>
      )}
      <br />
      <Button
        type="submit"
        onClick={() => {
          if (!hasNullProperty(requestBody)) {
            fetchData('', {}, requestBody);
          } else {
            alert('Need to fill all fields except description');
          }
        }}
      >
        {mode === 'create' ? <> Create New Brand</> : <>Edit Brand</>}
      </Button>
    </FormContainer>
  );
};
