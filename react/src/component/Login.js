import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookLogin from "react-facebook-login";
import './Login.css'
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Swal from "sweetalert2";

function Copyright(props) {
  return (
   
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const theme = createTheme();
const responseFacebook = (res) => {
  console.log("login result", res);
  window.location = "/Album";
};
const componentClicked = (data) => {
  console.warn(data);
};

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(jsonData);
    fetch("http://localhost:4000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // alert("Login sucess");
          window.location = "/Album";
        } else {
          Swal.fire(
            {
              icon: "error",
              title: "",
              text: "Something went wrong!",
            },
            1000
          );
          // alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return data;
  };

  return (
    <div className="box">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              paddingTop:2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography className="hul" component="h1" variant="h5">
              เข้าสู่ระบบ
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                className="signIn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
                <LoginRoundedIcon />
              </Button>
              <div className="bottomor" align="center">
                OR
              </div>

              <FacebookLogin
                appId="873646533856906"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                textButton={
                  <div className="facebooks">
                    <FacebookOutlinedIcon color="primary" />
                    Login with Facebook
                  </div>
                }
                callback={responseFacebook}
                cssClass="facebook"
              />

              <Grid container>
                <Grid item xs>
                  <Link className="hul" href="#" variant="body2">
                    ลืมรหัสผ่าน
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="hul" href="/register" variant="body2">
                    {"ลงทะเบียน"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
