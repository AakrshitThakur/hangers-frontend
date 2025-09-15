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

export type { GetAllClothesResponse, GetAllClothesData };
