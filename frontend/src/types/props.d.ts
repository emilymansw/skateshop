import {
  ICategoryData,
  IOptionFamilyData,
  IImagesUploadedData,
  IProductData,
  IVariantData,
  ICreateOptionData,
} from './product';
import { IBrandData } from './brand';

export type ProductFormPropsType = {
  mode: string;
  variants: IVariantData[];
  setVariants: React.Dispatch<React.SetStateAction<IVariantData[]>>;
  category: ICategoryData | undefined;
  setCategory: React.Dispatch<React.SetStateAction<ICategoryData | undefined>>;
  brand: IBrandData | undefined;
  setBrand: React.Dispatch<React.SetStateAction<IBrandData | undefined>>;
  options: ICreateOptionData[];
  setOptions: React.Dispatch<React.SetStateAction<ICreateOptionData[]>>;
  optionValues: string[][];
  setOptionValues: React.Dispatch<React.SetStateAction<string[][]>>;
  optionFamilies: IOptionFamilyData[];
  setOptionFamilies: React.Dispatch<React.SetStateAction<IOptionFamilyData[]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  imagesUploaded: IImagesUploadedData[];
  setImagesUploaded: React.Dispatch<
    React.SetStateAction<IImagesUploadedData[]>
  >;
  checkValidAndFetch: () => void;
  data: IProductData | undefined;
  error: Error | null;
  createVariantsState?: boolean;
  optionCountState?: number;
  brandState?: string;
  categoryState?: string;
  variantsHistory?: IVariantData[] | undefined;
  optionsHistory?: ICreateOptionData[] | undefined;
};
