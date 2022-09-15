import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

const EditVendor = (props) => {

  const [name, setName] = useState(localStorage.getItem("name"));
  const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
  const [number, setNumber] = useState(localStorage.getItem("number"));
  const [openTime, setOpenTime] = useState(localStorage.getItem("openTime"));
  const [closeTime, setCloseTime] = useState(localStorage.getItem("closeTime"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };
  const onChangeOpenTime = (event) => {
    setOpenTime(event.target.value);
  };
  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value);
  };
  // const resetInputs = () => {
    
  //   setName(localStorage.getItem("name"));
  //   setShopName(localStorage.getItem("shopName"));
  //   setNumber(localStorage.getItem("number"));
  //   setOpenTime(localStorage.getItem("openTime"));
  //   setCloseTime(localStorage.getItem("closeTime"));
  //   setId(localStorage.getItem("id"));
  // };
  const onSubmit = (event) => {
    event.preventDefault(); 

    const newVendor = {
      name: name,
      number: number,
      shopName: shopName,
      openTime: openTime,
      closeTime: closeTime,
      id: id,
    };

    axios
      .post("http://localhost:4000/vendor/edit", newVendor)
      .then(function (response) {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("number", response.data.number);
        localStorage.setItem("shopName", response.data.shopName);
        localStorage.setItem("openTime", response.data.openTime);
        localStorage.setItem("closeTime", response.data.closeTime);
        // window.location.reload(false);
        alert("Edited\t" + response.data.name);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("Editing Failed");
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
        <Button variant="contained" onClick={onSubmit}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditVendor;
