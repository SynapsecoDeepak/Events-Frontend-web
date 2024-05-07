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

const rows = [
  {
    age: 27,
    status: "Active",
    paymentStatus:'paid',
    date: "2",
    name: "Sally Quinn",
    salary: "$19586.23",
    organization: "The Energy Research Institute(TERI)",
    designation: "Human Resources Assistant",
  },
  {
    age: 61,
    date: "5",
    paymentStatus:'unpaid',

    status: "Inactive",
    name: "Margaret Bowers",
    organization: "International Panel on Climate Change(IPCC)",
    designation: "Nuclear Power Engineer",
  },
  {
    age: 59,
    date: "5",
    name: "Minnie Roy",
    status: "Active",
    paymentStatus:'unpaid',

    salary: "$18991.67",
    organization: "Institute for Global Environment Startegies...",
    designation: "Environmental Specialist",
  },
  {
    age: 30,
    date: "1",
    status: "Inactive",
    salary: "$19252.12",
    paymentStatus:'unpaid',

    name: "Ralph Leonard",
    organization: "The Energy Research Institute(TERI)",
    designation: "Sales Representative",
  },
  {
    age: 66,
    status: "Active",
    date: "5",
    paymentStatus:'unpaid',

    salary: "$13076.28",
    name: "Annie Martin",
    designation: "Operator",
    organization: "International Panel on Climate Change(IPCC)",
  },
];

const statusObj = {
  absent: { color: "success" },
  present: { color: "#E2B675" },
};
const statusObj2 = {
  "true": { color: "success" },
  "false": { color: "#E2B675" },
};

const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const rowsDetails = useSelector(
    (state) => state.event?.registrationData?.data
  );

  console.log('redis',rowsDetails)

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
              <TableCell>Organization</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment-Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsDetails?.map((row) => (
              <TableRow
                hover
                key={row.registration_id}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row?.user_id?.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ color: "#2BACE2" }}>
                  {row?.user_id?.organization ||'Not Available'}
                </TableCell>
                <TableCell sx={{ fontSize: "12px !important" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: statusObj[row?.user_id?.status].color,
                      padding: "5px",
                      width: "68px",
                      height: "22px",
                      color:"white !important"
                    }}
                  >
                    {row?.user_id?.status}
                  </Button>
                </TableCell>
                <TableCell sx={{ fontSize: "12px !important" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: statusObj2[row?.payment_status.toString()].color,
                      padding: "5px",
                      width: "68px",
                      height: "22px",
                      color:"white !important"

                    }}
                  >
                    {row?.payment_status.toString()}
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
      {selectedAction && (
        <Typography variant="subtitle1">
          Selected Action: {selectedAction}
        </Typography>
      )}
    </Card>
  );
};

export default DashboardTable;
