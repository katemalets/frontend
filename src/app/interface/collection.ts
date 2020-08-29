export interface Collection {
  id: number;
  name: string;
  topic: string;
  imageURL: string;
  description: string;
  items: {id: number, name: string, description: string, imageURL: string };
}
