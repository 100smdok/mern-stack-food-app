import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";

class PlaceOrder extends React.Component {
  state = {
    counter: 1,
    food_id: localStorage.getItem("foodId"),
    buyer_id: localStorage.getItem("id"),
    curTime: new Date(),
  };
  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };
  onSubmit = (event) => {
    const newOrder = {
      quantity: this.state.counter,
      buyer_id: this.state.buyer_id,
      food_id: this.state.food_id,
      placedOn: this.state.curTime.toString(),
    };
    const newUser = {
      wallet: parseInt(localStorage.getItem("wallet")) - (this.state.counter * parseInt(localStorage.getItem("foodPrice"))),
      id: this.state.buyer_id,
    };
    if(parseInt(localStorage.getItem("foodPrice")) * this.state.counter > parseInt(localStorage.getItem("wallet")))
    {
      alert("Not Enough Money");
    }
    else
    {
      axios
      .post("http://localhost:4000/order/add", newOrder)
      .then(function (response) {
        alert("Placed Order Succesfully");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("Placing Order Failed");
      });
      axios
      .post("http://localhost:4000/user/addMoney", newUser)
      .then(function (response) {
        localStorage.setItem("wallet", response.data.wallet);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  };
  render() {
    const displayCounter = this.state.counter > 1;

    return (
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup size="large" aria-label="large button group">
            <Button onClick={this.handleIncrement}>+</Button>
            <Button disabled>Quantity - {this.state.counter}</Button>

            {displayCounter && (
              <Button onClick={this.handleDecrement}>-</Button>
            )}
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={this.onSubmit}>
            Place Order
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default PlaceOrder;
