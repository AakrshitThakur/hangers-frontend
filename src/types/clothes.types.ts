interface GetAllClothesData {
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
}

interface GetAllClothesResponse {
  message: string;
  clothes: GetAllClothesData[];
}

interface CreateCloth {
  title: string;
  clothImages: File[];
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
}

export type { GetAllClothesResponse, GetAllClothesData, CreateCloth };
