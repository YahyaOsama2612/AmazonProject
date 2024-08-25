import { Grid } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: IProps) => {
  return (
    <div>
      <Grid
        sx={{ p: 2 }}
        container
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <img src="amazon-logo.jpg" alt="amazon logo" height={"120px"} />
        <main>{children}</main>
      </Grid>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
