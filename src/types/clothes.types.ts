interface GetClothData {
  _id: string;
  title: string;
  isTop3: string;
  images: {
    url: string;
    publicId: string;
    _id: string;
  }[];
  category: string;
  actualPrice: string;
  discountedPrice: string;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
}

interface GetAllClothesResponse {
  message: string;
  clothes: GetClothData[];
}

interface GetClothResponse {
  message: string;
  cloth: GetClothData;
}

// firstly - get the cloth data | lastly - update the cloth data
interface UpdateClothResponse {
  message: string;
  cloth?: GetClothData & { clothImages: File[] } & { publicIds: string[] };
}

type GetUpdateCloth = GetClothData & { clothImages: File[] } & { publicIds: string[] };

interface CreateCloth {
  title: string;
  clothImages: File[];
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
}

interface UpdateCloth {
  title: string;
  clothImages: File[];
  publicIds: string[];
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
}

export type {
  GetAllClothesResponse,
  GetClothData,
  GetClothResponse,
  CreateCloth,
  UpdateCloth,
  UpdateClothResponse,
  GetUpdateCloth,
};
