import { addItemToCart } from "../app/applications/cart/cartSlice";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import usequeryhook from "../hooks/usequeryhook";
import { IProduct } from "../interfaces";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const {
    data = [{}],
    isLoading,
    error,
  } = usequeryhook({
    queryKey: ["productList"],
    url: "/products?limit=10&select=title,price,thumbnail",
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  

  return (
    <Grid container direction="row" justifyContent="center" spacing={3}>
      {data?.products?.length ? (
        data.products.map((product: IProduct) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                borderRadius: "8px",
                
                border:"1px solid pink",
              }}
            >
              <CardMedia
                component="img"
                alt={`product ${product.id} image`}
                image={product.thumbnail}
                sx={{
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "17px" }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  ${product.price}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }} 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => dispatch(addItemToCart(product))}
                  >
                    <ShoppingCart style={{ cursor: "pointer" }} />
                  </motion.div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          No products available
        </Typography>
      )}
    </Grid>
  );
};

export default memo(Products) ;
