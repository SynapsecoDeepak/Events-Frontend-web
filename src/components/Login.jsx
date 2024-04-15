import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  IconButton,
  Link,
  Button,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BlankLayout2 from "src/@core/layouts/AnotherBlankLayout";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { Email } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/store/slice/authSlice";
import { BASE_URL } from "src/constants";
import Cookies from "js-cookie";

const SignInCard = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const CookiesToken = Cookies.get("token");
    if (CookiesToken) {
      router.push("/");
    }
  }, [router]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(userData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (validateForm()) {
      axios
        .post(`${BASE_URL}/api/user/login/`, {
          email: userData.email,
          password: userData.password,
        })
        .then((response) => {
          console.log("API Response:", response.data);
          const userData = response.data;
          dispatch(login({ userData }));
          const token = response.data.token;
          Cookies.set("token", token, { expires: 15 });

          if (response.data.status === true) {
            toast.success("Login successful");
            router.push("/");
          } else {
            toast.error("Login failed");
          }

          if (response && response.data && response.data.message) {
            setErrors({ ...errors, apiError: response.data.message });
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setErrors({ ...errors, apiError: error.response.data.message });
            toast.error(error.response.data.message);
          }
        });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "center",
          margin: "8em auto",
        }}
        container
        spacing={2}
      >
        {/* Left Div */}
        <Grid
          sx={{
            backgroundColor: "#F2F2F2",
            border: "1px solid #F2F2F2",
            borderRadius: "5px",
          }}
          item
          xs={4}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/iMedEvent.png"
              alt="Second Image"
              style={{ width: "50%", marginBottom: "10px" }}
            />
            <img
              src="/imed-center.svg"
              alt="First Image"
              style={{ width: "50%", marginBottom: "10px" }}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ color: "#0E446C", fontSize: "30px", fontWeight: "400" }}
            >
              Elevating Healthcare through Enlightening Experiences
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#2BACE2 !important", fontSize: "20px" }}>
              Where Medical Minds Unite!
            </Typography>
          </Box>
        </Grid>
        {/* Right Div */}
        <Grid
          sx={{ border: "1px solid #F2F2F2", borderRadius: "5px" }}
          item
          xs={4}
        >
          <Box sx={{ width: "100%", padding: "4rem 4rem" }}>
            <Typography
              sx={{ color: "#0E436B", fontSize: "48px", fontWeight: "400" }}
              gutterBottom
            >
              Sign in
            </Typography>
            <Typography
              sx={{ color: "#707070", fontSize: "1rem" }}
              gutterBottom
            >
              Unveiling Tomorrow's Healthcare: Where Conferences Shape the
              Future of Medicine.
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              value={userData.email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <Email />
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={userData.password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">
                  <Link href="#" color="inherit">
                    Remember me
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Link sx={{ color: "#2BACE2" }} href="#" color="inherit">
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Button
              onClick={handleLogin}
              sx={{
                marginTop: "1em",
                padding: ".50em, 1em",
                backgroundColor: "#0E436B",
                borderRadius: "50px",
              }}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>

            {/* Display API error if exists */}
            {errors.apiError && (
              <Typography color="error" gutterBottom>
                {errors.apiError}
              </Typography>
            )}
          </Box>
          <Typography sx={{ margin: "1em 1em", textAlign: "center" }}>
            © 2024 CME4LIFE. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInCard;
