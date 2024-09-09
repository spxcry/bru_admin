type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createAt: Date;
  updateAt: Date;
};

type CustomerTypes = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
};