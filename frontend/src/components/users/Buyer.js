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
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicButtonGroup() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortName2, setSortName2] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [permFoods, setPermFoods] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/food/getallFood")
      .then((res) => {
        console.log(res.data);
        setFoods(res.data);
        setPermFoods(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const sortChangeRating = () => {
    let foodsTemp = foods;
    const flag = sortName2;
    foodsTemp.sort((a, b) => {
      if (a.rating != undefined && b.rating != undefined) {
        return (1 - flag * 2) * (a.rating - b.rating);
      } else {
        return 1;
      }
    });
    setFoods(foodsTemp);
    setSortName2(!sortName2);
  };
  const sortChange = () => {
    let foodsTemp = foods;
    const flag = sortName;
    foodsTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (a.price - b.price);
      } else {
        return 1;
      }
    });
    setFoods(foodsTemp);
    setSortName(!sortName);
  };
  const fuse = new Fuse(permFoods, {
    keys: ["name"],
  });
  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
    let temp1 = fuse.search(event.target.value);
    let temp2 = [];
    if (temp1.length > 0) {
      temp1.forEach((element) => {
        temp2.push(element.item);
      });
      temp1 = temp2;
    }
    setFoods(temp1);
  };
  let wallet = localStorage.getItem("wallet");
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => navigate("/addmoney")}>
              Add amount to Wallet
            </Button>
            <Button onClick={() => navigate("/editbuyer")}>Edit Profile</Button>
            <Button onClick={() => navigate("/buyerorder")}>My Orders</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Item>Current Wallet Amount :{wallet}</Item>
        </Grid>
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
                  <TableCell>Food Name</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price in Rs.
                  </TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortChangeRating}>
                      {sortName2 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating
                  </TableCell>
                  <TableCell>Order</TableCell>
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
                          navigate("/placeorder");
                        }}
                      >
                        Place Order
                      </Button>
                    </TableCell>
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
