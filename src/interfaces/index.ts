export interface IProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity:number;
  description:string;

}

export interface CounterState {
  cartItems: IProduct[];
}