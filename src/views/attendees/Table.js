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
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "src/constants";
import { attendeesEditData, deleteAttendee } from "src/store/slice/eventSlice";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";



const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedAction, setSelectedAction] = useState(null);

  const rows = useSelector((state) => state.event?.attendeesData?.data);
  const UserEditAbleData = useSelector( (state) => state?.event?.attendeesEditData);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  const handleDelete = async() => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/user/attendees/${UserEditAbleData?.attendee_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Attendee deleted successfully')
      dispatch(deleteAttendee(UserEditAbleData?.attendee_id))
      setAnchorEl(null)
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };

  const handleAction = (event, row) => {
    console.log(row)
    setAnchorEl(event.currentTarget);
    dispatch(attendeesEditData(row));
  };

  const handleEdit = () => {
    router.push("/attendees/edit-attendees");
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
                      onClick={(event)=>handleAction(event,row)}
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
                          <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(row)}>
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
