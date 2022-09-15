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
import Rating from "@mui/material/Rating";

export default function BuyerOrder() {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [value, setValue] = React.useState(0);
  const Completed = (order) => {
    if (order.status === "ready for pickup") {
      localStorage.setItem("order_id", order._id);
      return <Picked />;
    } else {
      return <></>;
    }
  };
  const rating = (order) => {
    if (order.status === "completed" && order.canRate === true) {
      localStorage.setItem("food_id", order.food_id);
      return <Rated />;
    } else {
      return <></>;
    }
  };
  const Rated = (props) => {
    return (
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          axios
            .post("http://localhost:4000/order/rate", {
              order_id: localStorage.getItem("order_id"),
            })
            .then((res) => {
              console.log(res.data);
              window.location.reload(false);
            })
            .catch((err) => {
              console.log(err);
              alert("Rating Failed");
            });
          axios
            .post("http://localhost:4000/food/rate", {
              rating: newValue,
              food_id: localStorage.getItem("food_id"),
            })
            .then((res) => {
              console.log(res.data);
              window.location.reload(false);
            })
            .catch((err) => {
              console.log(err);
              alert("Rating Failed");
            });
          axios
            .post("http://localhost:4000/food/updatenumber", {
              food_id: localStorage.getItem("food_id"),
            })
            .then((res) => {
              console.log(res.data);
              window.location.reload(false);
            })
            .catch((err) => {
              console.log(err);
              alert("Rating Failed");
            });
        }}
      />
    );
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      order_id: localStorage.getItem("order_id"),
      status: "completed",
    };
    axios
      .post("http://localhost:4000/order/editstatus", newOrder)
      .then(function (response) {
        console.log(response.data);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Picked = (props) => {
    return (
      <Button variant="contained" onClick={onSubmit}>
        Picked Up
      </Button>
    );
  };
  useEffect(() => {
    async function fetchData() {
      // var tempOrdres = [];
      // var tempFoods = [];
      let tor = await axios.post("http://localhost:4000/order/getorders", {
        buyer_id: localStorage.getItem("id"),
      });
      let tempOrders = await tor.data;
      let tf = await axios.post("http://localhost:4000/food/getallfood");
      let tempFoods = await tf.data;
      console.log(tempFoods);
      tempOrders.map((tord) => {
        tempFoods.map((tfood) => {
          if (tord.food_id === tfood._id) {
            tord.food_name = tfood.name;
            tord.food_price = tfood.price;
            tord.vendor_name = tfood.vendor_name;
          }
        });
      });
      console.log(tempOrders);
      setOrders(tempOrders);
      setFoods(tempFoods);
    }
    fetchData();
  }, []);
  console.log(orders);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* <Grid item xs={6}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Favorites</Button>
            <Button>Add amount to Wallet</Button>
            <Button>Edit Profile</Button>
            <Button>My Orders</Button>
          </ButtonGroup>
        </Grid> */}
        {/* <Grid item xs={12}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              value={searchText}
              onChange={onChangeSearchText}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </List>
        </Grid> */}
        <Grid item xs={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Placed Time</TableCell>
                  <TableCell>Vendor name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{order.placedOn}</TableCell>
                    <TableCell>{order.vendor_name}</TableCell>
                    <TableCell>{order.food_name}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      {order.status} {Completed(order)}
                    </TableCell>
                    <TableCell>{order.food_price * order.quantity}</TableCell>
                    <TableCell>{rating(order)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
