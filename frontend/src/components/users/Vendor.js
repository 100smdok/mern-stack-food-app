import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from "fuse.js";
import List from "@mui/material/List";

export default function BasicButtonGroup() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const UpdateStatus = (food) => {
    if (food.status === "placed") {
      return Placed(food);
    } else {
      return PlacedNot(food);
    }
  };
  const PlacedNot = (food) => {
    if (food.status === "accepted") {
      localStorage.setItem("order_id", food.order_id);
      return (
        <Button
          onClick={() => {
            let status = "cooking";
            axios
              .post("http://localhost:4000/order/updateStatus", {
                order_id: localStorage.getItem("order_id"),
                status: status,
              })
              .then((res) => {
                window.location.reload();
              });
              food.status = "cooking";
          }}
        >
          move to next stage
        </Button>
      );
    } else if (food.status === "cooking") {
      localStorage.setItem("order_id", food.order_id);
      return (
        <Button
          onClick={() => {
            let status = "ready for pickup";
            axios
              .post("http://localhost:4000/order/updateStatus", {
                order_id: localStorage.getItem("order_id"),
                status: status,
              })
              .then((res) => {
                window.location.reload();
              });
              food.status = "ready for pickup";
          }}
        >
          move to next stage
        </Button>
      );
    } else {
      return <></>;
    }
  };

  const Placed = (food) => {
    localStorage.setItem("order_id", food.order_id);
    return (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => {
            let status = "rejected";
            axios
              .post("http://localhost:4000/order/updateStatus", {
                order_id: localStorage.getItem("order_id"),
                status: status,
              })
              .then((res) => {
                window.location.reload();
              });
              food.status = "rejected";
          }}
        >
          reject
        </Button>
        <Button
          onClick={() => {
            let status = "accepted";
            axios
              .post("http://localhost:4000/order/updateStatus", {
                order_id: localStorage.getItem("order_id"),
                status: status,
              })
              .then((res) => {
                window.location.reload();
              });
              food.status = "accepted";
          }}
        >
          accept
        </Button>
      </ButtonGroup>
    );
  };

  useEffect(() => {
    async function fetchData() {
      // var tempOrdres = [];
      // var tempFoods = [];
      let tor = await axios.post(
        "http://localhost:4000/food/getfood",
        {
          id: localStorage.getItem("id"),
        }
      );
      let tempFoods = await tor.data;
      let tf = await axios.post("http://localhost:4000/order/getallorders");
      let tempOrders = await tf.data;
      console.log(tempFoods);
      tempFoods.map((tfood) => {
        tempOrders.map((tord) => {
          if (tord.food_id === tfood._id) {
            tfood.quantity = tord.quantity;
            tfood.placedOn = tord.placedOn;
            tfood.status = tord.status;
            tfood.order_id = tord._id;
          }
        });
      });
      console.log(tempOrders);
      setOrders(tempOrders);
      setFoods(tempFoods);
    }
    fetchData();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => navigate("/foodmenu")}>Food Menu</Button>
            <Button onClick={() => navigate("/addfood")}>Add Food</Button>
            <Button onClick={() => navigate("/statistics")}>Statistics</Button>
            <Button onClick={() => navigate("/editvendor")}>Edit Profile</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Placed Time</TableCell>
                <TableCell>Food Name</TableCell>
                <TableCell>Quantity </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food, ind) => (
                food.placedOn === "" ?
                <TableRow key={ind}>
                  <TableCell>{food.placedOn}</TableCell>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>{food.quantity}</TableCell>
                  <TableCell>
                    {food.status} {UpdateStatus(food)}
                  </TableCell>
                </TableRow> : <></>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Box>
  );
}
