export interface Item {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  tags: {id: number, name: string};
}
