import { useSelector } from "react-redux";
import {
  removeItemToCart,
  selectCartItems,
} from "../app/applications/cart/cartSlice";
import { useAppDispatch } from "../app/store";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { motion } from "framer-motion";
import { IProduct } from "../interfaces";
import { Trash } from "lucide-react";

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
      {cartItems.map((product: IProduct) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} mt={5}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: "8px",
              border: "3px solid orange",
            }}
          >
            <CardMedia
              component="img"
              alt={`product ${product.id} image`}
              image={product.thumbnail}
              sx={{
                height: 150,
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
                borderBottom: "3px solid orange",
              }}
            />
            <CardContent sx={{ padding: 2 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "13px" }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "8px" }}
              >
                {product.description}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                ${product.price}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginTop: -2 }}
                >
                  <span>Quantity: {product.quantity}</span>
                </Typography>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Trash
                    size={16}
                    style={{
                      marginLeft: 10,
                      transform: "translate(0px, -7px)",
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(removeItemToCart(product))}
                  />
                </motion.div>
              </Box>
            </CardContent>
          </Card>
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

export default memo(CartPage);
