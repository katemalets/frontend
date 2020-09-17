export interface Collection {
  id: number;
  name: string;
  topic: string;
  imageURL: string;
  description: string;
  userId: number;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    tags: {
      id: number;
      name: string;
    };
  };
}
