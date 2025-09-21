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

// firstly - get the cloth data | lastly - update the cloth data
interface UpdateClothResponse {
  message: string;
  cloth?: GetClothData & { clothImages: File[] };
}

interface CreateCloth {
  title: string;
  clothImages: File[];
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
}

export type {
  GetAllClothesResponse,
  GetClothData,
  CreateCloth,
  UpdateClothResponse,
};
