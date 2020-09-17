export interface User {
  id: number;
  username: number;
  email: string;
  password: string;
  enabled: boolean;
  authorities: {
    id: number;
    authority: string
  };
  collections: {
    name: string;
    topic: string;
    imageURL: string
  };
  likedItems: {
    id: number;
    name: string
  };
}
