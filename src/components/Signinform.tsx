import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SIGNIN_FORM } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../validation";
import InputErrorMessage from "./InputErrorMessage";
import { NavLink } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  identifier: string;
  password: string;
}
const Signinform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("DATA", data);
    try {
      //  * 2 - Fulfilled => SUCCESS => (OPTIONAL)
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(data);
      console.log(resData);
      if (status === 200) {
        toast.success("You will navigate to the home page after 2 seconds.", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      //  * 3 - Rejected => FAILED => (OPTIONAL)
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      // console.log(error);
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    }
  };

  const renderSigninForm = SIGNIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx}>
          <TextField
            sx={{ paddingTop: 2, paddingBottom: 1, width: 350 }}
            variant="outlined"
            size="small"
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: "#cccccc",
        width: "350px",
        marginTop: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} justifyContent={"flex-start"}>
          <Typography variant="h4" component={"h1"}>
            Sign in
          </Typography>
          {renderSigninForm}
          <Button type="submit"> Sign in</Button>
        </Grid>
      </form>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span> By continuing you agree to amazons </span>
        </small>
      </div>
      <div>
        <small>
          <a href="#" style={{ textDecoration: "none" }}>
            {""} Condition of use
          </a>
          {""} and {""}{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            privacey policy
          </a>
        </small>
      </div>
      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />
      <div>
        <small>
          Don't have an account?{" "}
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Register{" "}
          </NavLink>
        </small>
      </div>
      <div>
        <small>
          Buying for work?
          <a href="#" style={{ textDecoration: "none" }}>
            {"  "} Create a free business account
          </a>
          {"  "}
        </small>
      </div>
    </Box>
  );
};

export default Signinform;
