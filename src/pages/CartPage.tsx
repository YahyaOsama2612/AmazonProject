import { useSelector } from "react-redux";
import {
  removeItemToCart,
  selectCartItems,
} from "../app/applications/cart/cartSlice";
import { useAppDispatch } from "../app/store";
import { Grid } from "@mui/material";
import { memo } from "react";

const CartPage = () => {
  const { cartItems } = useSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };
  return cartItems.length > 0 ? (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      {cartItems.map((product) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={product.id}>
          <img
            style={{ marginTop: "50px", width: "200px" }}
            src={product.thumbnail}
            alt={`product ${product.id} image`}
          />

          <div>
            <h5 style={{ margin: 20 }}>{product.title}</h5>

            <div>
              <p>
                <span style={{ margin: 20 }}>${product.price}</span>
              </p>
              <div style={{ margin: 20 }}>
                <span>Quantity: {product.quantity}</span>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    style={{ height: 15, marginLeft: 10 }}
                    onClick={() => dispatch(removeItemToCart(product))}
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Grid>
      ))}
      <div
        style={{
          position: "fixed",
          marginLeft: "1%",
          backgroundColor: "#000000",
          color: "white",
          padding: 15,
          top: 10,
        }}
      >
        Total Price: ${calculateTotalPrice().toFixed(2)}
      </div>
    </Grid>
  ) : (
    <h1>Cart is Empty</h1>
  );
};

export default memo(CartPage) ;
