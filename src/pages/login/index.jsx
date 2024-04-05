import React, { useState } from "react";
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

const SignInCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        height:"100vh",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          width:"90%",
          justifyContent: "center",
          
          margin:'8em auto'
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
              Sign In
            </Typography>
            <Typography
              sx={{ color: "#707070", fontSize: "12px" }}
              gutterBottom
            >
              Elevating Healthcare through Enlightening Experiences
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <VisibilityIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
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
                  <Link href="#" color="inherit">
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Button sx={{marginTop:"1em"}} variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
          © 2024 CME4LIFE. All Rights Reserved.
        </Grid>

      </Grid>
   </Box>
  );
};

SignInCard.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default SignInCard;
