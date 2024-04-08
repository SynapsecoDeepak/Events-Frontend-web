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
import { ArrowDropDown, MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";



const statusObj = {
  Active: { color: "success" },
  Inactive: { color: "#E2B675" },
};

const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const rows = useSelector(state=> state.event?.sponsorData?.data)


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
              <TableCell>Speaker Name</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {/* {rows.map((row) => (
              <TableRow
                hover
                key={row.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ color: "#2BACE2" }}>
                  {row.organization}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell sx={{ fontSize: "12px !important" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: statusObj[row.status].color,
                      padding: "5px",
                      width: "68px",
                      height: "22px",
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
                <TableCell>
                <Button sx={{backgroundColor:"#0E446C !important",color:"white !important"}} onClick={handleClick}>
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
            ))} */}


{Array.isArray(rows) &&
                rows.map((row) => (
                  <TableRow
                  hover
                  key={row?.sponsor_user?.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                      >
                        {row?.sponsor_user?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ color: "#2BACE2" }}>
                    {row?.sponsor_user?.organization}
                  </TableCell>
                  <TableCell>{row?.date}</TableCell>
                  <TableCell sx={{ fontSize: "12px !important" }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: statusObj[row?.sponsor_user?.status].color,
                        padding: "5px",
                        width: "68px",
                        height: "22px",
                      }}
                    >
                      {row.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                  <Button sx={{backgroundColor:"#0E446C !important",color:"white !important"}} onClick={handleClick}>
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
