import Button from "../components/Button";
import { addItemToCart } from "../app/applications/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
import usequeryhook from "../hooks/usequeryhook";
import { IProduct } from "../interfaces";

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
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Grid container direction={"row"} justifyContent={"center"}>
      {data?.products?.length ? (
        data.products.map((product: IProduct) => (
          <div key={product.id}>
            <img
              className="object-cover"
              style={{ margin: 20, width: "200px" }}
              src={product.thumbnail}
              alt={`product ${product.id} image`}
            />
            <h5 style={{ margin: 20 }}>{product.title}</h5>
            <p>
              <span
                style={{ margin: 20 }}
                className="text-3xl font-bold text-slate-900"
              >
                ${product.price}
              </span>
            </p>
            <Box>
              <Button
               onClick={() => dispatch(addItemToCart(product))}
                style={{ display: "flex", margin: "15px", padding: "10px " }}
              >
                Add to cart
              </Button>
            </Box>
          </div>
        ))
      ) : (
        <div>No products available</div>
      )}
    </Grid>
  );
};

export default Products;
