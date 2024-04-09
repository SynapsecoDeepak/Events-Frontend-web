import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useSelector } from "react-redux";

const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const rows = useSelector((state) => state.event?.attendeesData?.data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    setSelectedAction(action);
    setAnchorEl(null);
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell> Name</TableCell>
              <TableCell> Email</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <TableRow
                  hover
                  key={row.attendee_user?.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1rem  !important",
                        }}
                      >
                        {row.attendee_user?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ color: "#2BACE2" }}>
                    {row.attendee_user?.email}
                  </TableCell>
                  <TableCell  sx={{
                          fontWeight: 500,
                          fontSize: "1rem  !important",
                        }}> {row.attendee_user?.organization_name}</TableCell>
                  {/* <TableCell sx={{ fontSize: "12px !important" }}>
                    {Array.isArray(row.attendee_user.tag)
                      && row.attendee_user.tag.map((tag) => tag.name).join(", ")
                     }
                  </TableCell> */}
                  <TableCell sx={{ fontSize: "1rem !important" }}>
                    {row?.tag.map(tag=>tag.name).join(',')}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#0E446C !important",
                        color: "white !important",
                      }}
                      onClick={handleClick}
                    >
                      Action <ArrowDropDown />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleMenuItemClick("Edit")}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick("Delete")}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {selectedAction && (
        <Typography variant="subtitle1">
          Selected Action: {selectedAction}
        </Typography>
      )} */}
    </Card>
  );
};

export default DashboardTable;
