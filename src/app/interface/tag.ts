export interface Tag {
  id: number;
  name: string;
  items: {
    id: number;
    name: string;
    description: string;
    imageURL: string};
}
