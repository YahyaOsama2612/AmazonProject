import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  //   InputLabel,
  Typography,
} from "@mui/material";
import { REGISTER_FORM } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";
// import { FormEvent } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import InputErrorMessage from "./InputErrorMessage";
import { NavLink , useNavigate} from "react-router-dom";
import { IErrorResponse } from "../interfaces";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegstrationForm =  () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
  
      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 2 seconds to signin.",
          {
            position: "bottom-center",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );
  
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      //  * 3 - Rejected => FAILED => (OPTIONAL)
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      // console.log(error);
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    }
    console.log("DATA", data);
  };

  

  const renderRegisterForm = REGISTER_FORM.map(
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
            Create Account
          </Typography>

          {/* <InputLabel sx={{fontWeight:500 , marginTop: 1 , color: "#000000" }} htmlFor="name" >Your Name</InputLabel> */}
          {renderRegisterForm}
          <Button type="submit"> Register</Button>
        </Grid>
      </form>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span> By creating an account, you agree to amazons </span>
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
          Already have an account?{" "}
          <NavLink
            to="/signin"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Sign in{" "}
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

export default RegstrationForm;
