export interface Item {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  collection: number;
  tags: {
    id: number;
    name: string
  };
}
