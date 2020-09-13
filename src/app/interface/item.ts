export interface Item {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  collection: number;
  likesNumber: number;
  userLiked: boolean;
  tags: {
    id: number;
    name: string
  };
}
