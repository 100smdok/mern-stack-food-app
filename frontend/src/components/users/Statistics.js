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
import PlaceOrder from "./PlaceOrder";

export default function BasicButtonGroup() {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [palcedOrders, setPlacedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  useEffect(() => {
    async function fetchData() {
      // var tempOrdres = [];
      // var tempFoods = [];
      let tor = await axios.post("http://localhost:4000/food/getfood", {
        id: localStorage.getItem("id"),
      });
      let tempFoods = await tor.data;
      let tf = await axios.post("http://localhost:4000/order/getallorders");
      let tempOrders = await tf.data;
      var tplaceOrder = 0,
        tpendingOrder = 0,
        tcompletedOrder = 0;
      console.log(tempOrders);
      console.log(tempFoods);
      tempFoods.map((tfood) => {
        tempOrders.map((tord) => {
          if (tord.food_id == tfood._id) {
            console.log(tord);

            if (tord.status === "completed") tcompletedOrder++;
            else if (tord.status.toString() === "placed") tplaceOrder++;
            else tpendingOrder++;
          }
        });
      });
      setPlacedOrders(tplaceOrder);
      setPendingOrders(tpendingOrder);
      setCompletedOrders(tcompletedOrder);
      tempFoods.sort((a, b) => {
        if (a.number_placed < b.number_placed) {
          return 1;
        }
        if (a.number_placed > b.number_placed) {
          return -1;
        }
        return 0;
      });
      console.log(tempOrders);
      setOrders(tempOrders);
      setSortedFoods(tempFoods);
      setFoods(tempFoods);
    }
    fetchData();
  }, []);
  console.log(palcedOrders);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Top 5 Items</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedFoods.slice(0, 5).map((food, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{food.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Orders Placed</TableCell>
                  <TableCell>Pending Orders</TableCell>
                  <TableCell>Completed Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{palcedOrders}</TableCell>
                  <TableCell>{pendingOrders}</TableCell>
                  <TableCell>{completedOrders}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
