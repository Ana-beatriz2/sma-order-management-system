export interface IOrder {
  id: Date;
  clientName: string;
  status: string;
  items: Array<object>;
}

export interface INewOrder {
  clientName: string;
  items: Array<object>;
}
