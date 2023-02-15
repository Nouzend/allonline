import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Swal from "sweetalert2";

function Copyright(props) {
  // const [input, setInput] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [error, setError] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const onInputChange = (e) => {};

  // const validateInput = (e) => {};

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
  if (res.status !== "unknown") {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Keep going",
    });
    setTimeout(() => {
      window.location = "/Login";
    }, 500);
  }
};
const componentClicked = (data) => {
  console.warn(data);
};

export default function Register() {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // console.log("password was change", password);
    validateInput();
  }, [password]);

  const validateInput = () => {
    if (password.password !== password.confirmPassword) {
      setError((oldError) => ({
        ...oldError,
        ...{
          password: "ใส่พาสเวิร์ดให้ถูกด้วยค้าบ",
          confirmPassword: "ใส่ไม่ตรงกันนะเนี่ย",
        },
      }));
      return false;
    } else {
      setError((oldError) => ({
        ...oldError,
        ...{
          password: "",
          confirmPassword: "",
        },
      }));
    }
    return true;
  };

  const validateJsonData = (object) => {
    for (var key in object) {
      if (!object[key]) {
        return false;
      }
    }
    return true;
  };

  const handleSpace = (e) => {
    // console.log("handleSpaceRun");
    if (!e.target.value) {
      setError((oldError) => ({
        ...oldError,
        ...{ [e.target.name]: "ใส่ว่างไม่ได้เด้อครับ" },
      }));
    } else {
      setError((oldError) => ({ ...oldError, ...{ [e.target.name]: "" } }));
    }
  };

  const onInputChange = (e) => {
    // handleSpace(e);
    setPassword((oldPassword) => ({
      ...oldPassword,
      ...{ [e.target.name]: e.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      Fname: data.get("fname"),
      Lname: data.get("lname"),
      Email: data.get("email"),
      Password: data.get("password"),
    };

    // console.log(jsonData,validateJsonData(jsonData), validateInput());
    if (!validateInput() || !validateJsonData(jsonData)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
      return;
    }

    fetch("http://localhost:4000/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Keep going",
          });
          setTimeout(() => {
            window.location = "/Login";
          }, 500);
        } else {
          alert("Register failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="box">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              paddingTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography className="hul" component="h1" variant="h5">
              ลงทะเบียน
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fname"
                    required
                    fullWidth
                    id="Fname"
                    label="First Name"
                    autoFocus
                    onChange={(e) => handleSpace(e)}
                  />
                  {error.fname && <span className="err">{error.fname}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="family-name"
                    onChange={(e) => handleSpace(e)}
                  />
                  {error.lname && <span className="err">{error.lname}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"email"}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleSpace(e)}
                  />
                  {error.email && <span className="err">{error.email}</span>}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => onInputChange(e)}
                  />
                  {error.password && (
                    <span className="err">{error.password}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => onInputChange(e)}
                  />
                  {error.confirmPassword && (
                    <span className="err">{error.confirmPassword}</span>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
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
                    <FacebookOutlined color="primary" />
                    Login with Facebook
                  </div>
                }
                callback={responseFacebook}
                cssClass="facebook"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link className="hul" href="/Login" variant="body2">
                    เข้าสู่ระบบ
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
