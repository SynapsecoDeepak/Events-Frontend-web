import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const EditSession = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
        Session 1 Title come here
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        2024-04-05 ,  10:00 AM
        </Typography>
        <hr />
        <Typography variant="body1" gutterBottom>
          Description:
        </Typography>
        <TextField multiline rows={4} variant="outlined" fullWidth />
        <Typography variant="body1" gutterBottom>
          Tags:
        </Typography>
        <TextField variant="outlined" fullWidth />
        <Button variant="contained" color="primary">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditSession;
