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

const EditBuyer = (props) => {
  const [batch, setBatch] = useState(localStorage.getItem("batch"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [age, setAge] = useState(localStorage.getItem("age"));
  const [number, setNumber] = useState(localStorage.getItem("number"));
  const [id, setId] = useState(localStorage.getItem("id"));

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
//   const [values, setValues] = React.useState({
//     amount: "",
//     weight: "",
//     weightRange: "",
//     showPassword: false,
//   });
//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const resetInputs = () => {
//     setName("");
//     setBatch("");
//     setNumber("");
//     setAge("");
//   };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      number: number,
      age: age,
      batch: batch,
      id: id,
    };

    axios
      .post("http://localhost:4000/user/edit", newUser)
      .then(function (response) {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("number", response.data.number);
          localStorage.setItem("batch", response.data.batch);
          localStorage.setItem("age", response.data.age);
        alert("Edited\t" + response.data.name);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("Editing Failed");
      });

    // resetInputs();
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
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default EditBuyer;
