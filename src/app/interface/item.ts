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
  comments: {
    id: number,
    comment: string;
    username: string;
  };
}
