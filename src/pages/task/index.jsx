import { Typography } from "@mui/material";
import React from "react";
import TaskData from "src/components/speaker-components/TaskData";

const index = () => {
  return (
    <>
      <Typography
        sx={{ color: "#0E436B", fontSize: "30px", fontWeight: "700" }}
      >
        Tasks
      </Typography>
      <TaskData />
    </>
  );
};

export default index;
