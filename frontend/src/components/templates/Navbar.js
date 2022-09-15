import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Logout = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("usertype")) {
    return (
      <Button
        color="inherit"
        onClick={() => {
          navigate("/");
          localStorage.clear();
        }}
      >
        Logout
      </Button>
    );
  }
  else
    return null;
};

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            IIIT-H Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button>
          <Button color="inherit" onClick={() => navigate("/SignIn")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              if (
                localStorage.getItem("usertype") &&
                localStorage.getItem("usertype") === "buyer"
              ) {
                window.location = "/buyer";
              } else if (
                localStorage.getItem("usertype") &&
                localStorage.getItem("usertype") === "vendor"
              ) {
                window.location = "/vendor";
              } else {
                window.location = "/profile";
              }
            }}
          >
            My Profile
          </Button>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
