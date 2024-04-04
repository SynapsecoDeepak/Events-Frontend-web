import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import styles from "../../views/speaker/speaker.module.css";
const countries = [
  { value: "USA", label: "United States of America" },
  { value: "UK", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  // Add more countries as needed
];

const states = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  // Add more states as needed
];

const cities = [
  { value: "LA", label: "Los Angeles" },
  { value: "NYC", label: "New York City" },
  { value: "DAL", label: "Dallas" },
  // Add more cities as needed
];

const index = () => {
  return (
    <>
      <Typography
        sx={{ color: "#0E436B", fontSize: "30px", fontWeight: "700" }}
      >
        Tasks
      </Typography>

      <Card sx={{ padding: "2rem 1rem" }}>
        <CardContent>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TextField label="First Name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Contact" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Organization" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Designation" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Address" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField select label="Country" fullWidth>
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select label="State/Province" fullWidth>
                {states.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField label="City" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className={styles.submitButton}>Submit</button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default index;
