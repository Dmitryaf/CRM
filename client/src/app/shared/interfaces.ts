export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string;
  imgSrc?: string;
  user?: string;
  _id?: string;
}
export interface Message {
  message: string;
}

export interface Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  _id?: string;
  list: any[];
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}
