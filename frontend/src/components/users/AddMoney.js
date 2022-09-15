import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";

class AddMoney extends React.Component {
  state = { counter: 0, id: localStorage.getItem("id") };
  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 10 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 10 }));
  };
  onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      wallet: this.state.counter + parseInt(localStorage.getItem("wallet")),
      id: this.state.id,
    };

    axios
      .post("http://localhost:4000/user/addMoney", newUser)
      .then(function (response) {
        alert("Added Money Succesfully");
        localStorage.setItem("wallet", response.data.wallet);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("Adding Money Failed");
      });
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup size="large" aria-label="large button group">
            <Button onClick={this.handleIncrement}>+</Button>
            <Button disabled>Rs. {this.state.counter}</Button>

            {displayCounter && (
              <Button onClick={this.handleDecrement}>-</Button>
            )}
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={this.onSubmit}>
            Add Money
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AddMoney;
