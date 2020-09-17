export interface Item {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  collectionId: number;
  likesNumber: number;
  tags: {
    id: number;
    name: string
  };
}
