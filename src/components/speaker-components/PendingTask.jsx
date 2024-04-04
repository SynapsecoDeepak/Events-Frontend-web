import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PendingTasksCard = () => {
  // Sample data for tasks
  const tasks = [
    { taskName: "Task 1", time: "10:00 AM", date: "2024-01-15" },
    { taskName: "Task 2", time: "11:30 AM", date: "2024-01-16" },
    { taskName: "Task 3", time: "02:45 PM", date: "2024-01-17" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pending Tasks
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ color: "#2BACE2" }}>
                      {task.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(task.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PendingTasksCard;
