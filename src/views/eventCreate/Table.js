import React, { useState, useEffect } from "react";
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
import {
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ArrowDropDown, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios for making API requests
import {
  deleteSpeaker,
  speakerDataFullDetails,
  speakerEditData,
} from "src/store/slice/eventSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
import toast from "react-hot-toast";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [rowDataDetails, setRowDataDetails] = useState(null);

  const rows = useSelector((state) => state.event?.speakerData?.data);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const UserEditAbleData = useSelector(
    (state) => state?.event?.speakerEditData
  );
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;
  const rowsDetails = useSelector(
    (state) => state.event?.speakerDataFullDetails?.data?.speaker_user
  );
  const eventData = useSelector((state) => state.event?.eventData?.data);

  const statusObj = {
    present: { color: "success" },
    absent: { color: "#E2B675" },
  };

  useEffect(() => {
    if (selectedRowData) {
      // Fetch additional data when selectedRowData changes
      fetchRowDataDetails(selectedRowData.speaker_id); // Assuming id exists in selectedRowData, replace it with your actual identifier
    }
  }, [selectedRowData]);

  const fetchRowDataDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/speakers/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(speakerDataFullDetails(response.data));
      // setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
  };

  const handleClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  setSelectedRowData(null)
  };

  const handleEdit = () => {
    router.push("/speaker/edit-speaker");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/user/speakers/${UserEditAbleData?.speaker_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Speaker deleted successfully");
      dispatch(deleteSpeaker(UserEditAbleData?.speaker_id));
      setAnchorEl(null);
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };

  const handleAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    dispatch(speakerEditData(row));
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Event List</TableCell>
              {/* <TableCell>Organization</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(eventData) &&
              eventData.map((row) => (
                <TableRow
                  hover
                  key={row?.event_id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    // onClick={() => handleClick(row)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" ,padding:"1em 2em"}}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {row?.name  || 'Null'}
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell
                    style={{ color: "#2BACE2" }}
                    onClick={() => handleClick(row)}
                  >
                    {row?.speaker_user?.organization_name}
                  </TableCell> */}
                  {/* <TableCell onClick={() => handleClick(row)}>
                    {row?.date}
                  </TableCell> */}
                  {/* <TableCell sx={{ fontSize: "12px !important" }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: statusObj[row.speaker_user.status].color,
                        padding: "5px",
                        width: "68px",
                        height: "22px",
                      }}
                    >
                      {row.speaker_user.status}
                    </Button>
                  </TableCell> */}
                  {/* <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#0E446C !important",
                        color: "white !important",
                      }}
                      onClick={(event) => handleAction(event, row)}
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
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Box */}

      <Dialog open={Boolean(selectedRowData)} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1em 2em",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <DialogTitle>Speaker Details</DialogTitle>
          <Cancel
            sx={{ color: "red" }}
            onClick={handleClose}
          />
        </Box>
        <DialogContent sx={{ width: "auto" }}>
          {rowsDetails && (
            <Card>
              <Box sx={{ p: 2 }}>
                {/* Image */}
                {rowsDetails?.profile_photo && (
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={`http://172.171.210.167/${rowsDetails?.profile_photo}`}
                      alt="Speaker"
                      style={{
                        width: "auto",
                        marginBottom: "16px",
                        height: "auto",
                      }}
                    />
                  </Box>
                )}
                {/* Speaker Details */}
                <Typography variant="h6" gutterBottom>
                  {rowsDetails?.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Organization: {rowsDetails?.organization_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Bio: {rowsDetails?.bio}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {rowsDetails?.status?.toString()}
                </Typography>
              </Box>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DashboardTable;
