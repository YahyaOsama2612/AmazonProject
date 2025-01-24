// export interface IRegisterInput {
//   name: "email" | "username" | "password";
//   placeholder: string;
//   type: string;
//   validation: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: RegExp;
//   };
// }

// export interface ISigninInput {
//   name: "identifier" | "password";
//   placeholder: string;
//   type: string;
//   validation: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: RegExp;
//   };
// }

// export interface IErrorResponse {
//   error: {
//     details?: {
//       errors: {
//         message: string;
//       }[];
//     };
//     message?: string;
//   };
// }

export interface IProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity:number;

}

export interface CounterState {
  cartItems: IProduct[];
}