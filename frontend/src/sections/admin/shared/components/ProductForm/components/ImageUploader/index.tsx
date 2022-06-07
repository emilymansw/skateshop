import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IImagesUploadedData } from '../../../../../../../types/product';
import {
  DropZone,
  PreviewImageContainer,
  PreviewImage,
  Remove,
  PreviewImageWrapper,
} from './styles';

export const ImageUploader = ({
  imagesUploaded,
  setImagesUploaded,
}: {
  imagesUploaded: IImagesUploadedData[];
  setImagesUploaded: React.Dispatch<
    React.SetStateAction<IImagesUploadedData[]>
  >;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'skateshop');
      formData.append('cloud_name', 'drvuz5jme');
      fetch('  https://api.cloudinary.com/v1_1/drvuz5jme/upload', {
        method: 'post',
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data: { url: string; public_id: string }) => {
          setImagesUploaded((prevState) => [
            ...prevState,
            { imageUrl: data.url, cloudinaryId: data.public_id },
          ]);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <>
      <div>
        <DropZone
          {...getRootProps()}
          className={`${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </DropZone>
      </div>
      <div>
        {imagesUploaded.length > 0 && (
          <PreviewImageContainer>
            {imagesUploaded.map((image, mapIndex) => (
              <PreviewImageWrapper key={mapIndex}>
                <Remove
                  onClick={() => {
                    setImagesUploaded(
                      imagesUploaded.filter((_, index) => index !== mapIndex)
                    );
                  }}
                />
                <PreviewImage src={image.imageUrl} />
              </PreviewImageWrapper>
            ))}
          </PreviewImageContainer>
        )}
      </div>
    </>
  );
};
