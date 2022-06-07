import { IPaginationData } from './page';

export interface IImageData {
  name: string;
  imageUrl: string;
  cloudinaryId: string;
}

export interface IOptionData {
  name: string;
  optionValues: string[];
}

export interface ICreateOptionData {
  optionFamily: string;
  optionValues: string[];
}

export interface IImagesUploadedData {
  imageUrl: string;
  cloudinaryId: string;
}

export interface IVariantData {
  id?: number;
  stock: number;
  weight: number;
  price: number;
  compareAtPrice: number;
  optionValues: string[];
  colorName: string;
}

export interface IProductData {
  id: number;
  name: string;
  brandLogoUrl: string;
  brandSlug: string;
  description: string;
  categoryName: string;
  slug: string;
  images: IImageData[];
  options: IOptionData[];
  variants: IVariantData[];
  live?: boolean;
}

export interface IProductsData extends IPaginationData {
  content: IProductData[];
}

export interface IOptionFamilyData {
  id?: number;
  name: string;
  optionValues: string[];
}

export interface ICategoryData {
  name: string;
}

export interface IPartInfoData {
  variantId: undefined | number;
  variantOptionValues: undefined | string[];
  productName: undefined | string;
  image: undefined | string;
  price: undefined | number;
  quantity: undefined | number;
  cloudinaryId: undefined | string;
  color: undefined | string;
}

export interface ICompletedPartInfoData {
  variantId: number;
  variantOptionValues: string[];
  productName: string;
  image: string;
  price: number;
  quantity: number;
  cloudinaryId: string;
  color: string;
}

export interface ICompletedPartsInfoData {
  deck: ICompletedPartInfoData;
  gripTape: ICompletedPartInfoData;
  truck: ICompletedPartInfoData;
  wheel: ICompletedPartInfoData;
  hardware: ICompletedPartInfoData;
  bearing: ICompletedPartInfoData;
}

export interface IPartsInfoData {
  deck: IPartInfoData;
  gripTape: IPartInfoData;
  truck: IPartInfoData;
  wheel: IPartInfoData;
  hardware: IPartInfoData;
  bearing: IPartInfoData;
}

export interface ICartItemData {
  variantId: number;
  variantOptionValues: string[];
  productName: string;
  image: string;
  price: number;
  quantity: number;
}
