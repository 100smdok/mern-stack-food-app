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
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";

export default function FoodMenu() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/food/getFood", {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
        setFoods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Food Name</TableCell>
            <TableCell>Price in Rs.</TableCell>
            <TableCell>Veg/Non-Veg</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food, ind) => (
            <TableRow key={ind}>
              <TableCell>{ind + 1}</TableCell>
              <TableCell>{food.name}</TableCell>
              <TableCell>{food.price}</TableCell>
              <TableCell>{food.nveg}</TableCell>
              <TableCell>{food.rating}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("foodId", food._id);
                    localStorage.setItem("foodName", food.name);
                    localStorage.setItem("foodPrice", food.price);
                    localStorage.setItem("foodNveg", food.nveg);
                    navigate("/editfood");
                  }}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => {
                    axios
                      .post("http://localhost:4000/food/delete", {
                        id: food._id,
                      })
                      .then((res) => {
                        console.log(res.data);
                        alert("Successfully Deleted");
                      })
                      .catch((err) => {
                        console.log(err);
                        alert("Deletion Failed");
                      });
                      window.location.reload(false);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
