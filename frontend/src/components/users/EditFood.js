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

const EditFood = (props) => {
  const [name, setName] = useState(localStorage.getItem("foodName"));
  const [price, setPrice] = useState(localStorage.getItem("foodPrice"));
  const [id, setId] = useState(localStorage.getItem("foodId"));
  const [nveg, setNveg] = useState(localStorage.getItem("foodNveg"));
  const onChangeNveg = (event) => {
    setNveg(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const newfood = {
      id: id,
      name: name,
      price: price,
      nveg: nveg,
    };
    axios
      .post("http://localhost:4000/food/edit", newfood)
      .then((res) => {
        localStorage.setItem("foodName", res.data.name);
        localStorage.setItem("foodPrice", res.data.price);
        localStorage.setItem("foodNveg", res.data.nveg);
        console.log(res.data);
        alert("Edited\t" + res.data.name);
      })
      .catch((err) => {
        console.log(err);
        alert("Editing Food Failed");
      });
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Food's Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price in Rs."
          variant="outlined"
          value={price}
          onChange={onChangePrice}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Veg/Non-Veg
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={nveg}
            onChange={onChangeNveg}
            autoWidth
            label="Veg/Non-Veg"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Veg"}>Veg</MenuItem>
            <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Edit Food
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditFood;
