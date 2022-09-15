import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:4000/login", newUser)
      .then(function (response) {
        if (response.data.message && response.data.message === "Login successful") {
          console.log(response);
          alert("Login Successful");
          localStorage.setItem("usertype", response.data.type.toString());
          localStorage.setItem("id", response.data.user._id); 
          if (localStorage.getItem("usertype") && localStorage.getItem("usertype") === "buyer") {
            localStorage.setItem("wallet", response.data.user.wallet.toString());
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("batch", response.data.user.batch);
            localStorage.setItem("number", response.data.user.number);
            localStorage.setItem("age", response.data.user.age);
            window.location = "/buyer";
          }
          else
          {
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("number", response.data.user.number);
            localStorage.setItem("shopName", response.data.user.shopName);
            localStorage.setItem("openTime", response.data.user.openTime);
            localStorage.setItem("closeTime", response.data.user.closeTime);
            window.location = "/vendor";
          }
          resetInputs();
        }
        else {
          alert("Login Failed");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Login Failed");
      });
    // axios
    //   .post("http://localhost:4000/login/login", newUser)
    //   .then(function (response) {
    //     // eslint-disable-next-line no-console
    //     console.log(response.data);
    //     alert("Login Successful");
    //     //window.location.href="../common/Dashboardbuyer"
    //     window.location = "/dashboard";
    //     localStorage.setInfo("email", response.data.user.email);
    //     localStorage.setInfo("password", response.data.user.password);
    //     localStorage.setInfo("usertype", response.data.usertype);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert("Login Failed");
    //   });
  };
  return (
    <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signin;
