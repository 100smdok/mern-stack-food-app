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

const Role = (props) => {
  if (props.role === "Buyer") {
    return <User />;
  } else if (props.role === "Vendor") {
    return <Vendor />;
  } else {
    return <></>;
  }
};
const User = (props) => {
  const [batch, setBatch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
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
    setName("");
    setEmail("");
    setBatch("");
    setNumber("");
    setAge("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      number: number,
      age: age,
      email: email,
      password: password,
      batch: batch,
    };

    axios
      .post("http://localhost:4000/user/Register", newUser)
      .then(function (response) {
        alert("Created\t" + response.data.name);
        console.log(response.data);
        resetInputs();
      })
      .catch(function (error) {
        console.log(error);
        alert("Registeration Failed");
      });
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={number}
          onChange={onChangeNumber}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
          type="number"
        />
      </Grid>
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
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Batch</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={batch}
            onChange={onChangeBatch}
            autoWidth
            label="Batch"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"UG1"}>UG1</MenuItem>
            <MenuItem value={"UG2"}>UG2</MenuItem>
            <MenuItem value={"UG3"}>UG3</MenuItem>
            <MenuItem value={"UG4"}>UG4</MenuItem>
            <MenuItem value={"UG5"}>UG5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
const Vendor = (props) => {
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeOpenTime = (event) => {
    setOpenTime(event.target.value);
  };
  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value);
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
    setName("");
    setEmail("");
    setShopName("");
    setNumber("");
    setOpenTime("");
    setPassword("");
    setCloseTime("");
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      name: name,
      number: number,
      shopName: shopName,
      openTime: openTime,
      closeTime: closeTime,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:4000/vendor/Register", newVendor)
      .then(function (response) {
        alert("Created\t" + response.data.name);
        console.log(response.data);
        resetInputs();
      })
      .catch(function (error) {
        console.log(error);
        alert("Registeration Failed");
      });
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Manager's Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={number}
          onChange={onChangeNumber}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop name"
          variant="outlined"
          value={shopName}
          onChange={onChangeShopName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Open Time"
          variant="outlined"
          value={openTime}
          onChange={onChangeOpenTime}
          type="time"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Close Time"
          variant="outlined"
          value={closeTime}
          onChange={onChangeCloseTime}
          type="time"
        />
      </Grid>
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

const Register = (props) => {
  const [role, setRole] = useState("");
  const onChangeRole = (event) => {
    setRole(event.target.value);
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={role}
            onChange={onChangeRole}
            autoWidth
            label="Role"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Role role={role} />
    </Grid>
  );
};

export default Register;
