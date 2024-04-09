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
import { speakerDataFullDetails } from "src/store/slice/eventSlice";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const rows = useSelector((state) => state.event?.speakerData?.data);
  const rowsDetails = useSelector(
    (state) => state.event?.speakerDataFullDetails?.data.speaker_details
  );
  const state_token = useSelector((state) => state.auth.user?.userData.token);

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
      const response = await axios.get(
        `http://172.171.210.167/user/speakers/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${state_token}`,
          },
        }
      );
      dispatch(speakerDataFullDetails(response.data));

      setOpenDialog(true);

      console.log("Row data to show", rowDataDetails);
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
  };

  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDialog(false);
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
            {Array.isArray(rows) &&
              rows.map((row) => (
                <TableRow
                  hover
                  key={row?.speaker_user?.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  onClick={(event) => handleClick(event, row)}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {row?.speaker_user?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ color: "#2BACE2" }}>
                    {row?.speaker_user?.organization_name}
                  </TableCell>
                  <TableCell>{row?.date}</TableCell>
                  <TableCell sx={{ fontSize: "12px !important" }}>
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
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#0E446C !important",
                        color: "white !important",
                      }}
                    >
                      Action <ArrowDropDown />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Box */}

      <Dialog open={openDialog} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1em 2em",
          }}
        >
          <DialogTitle>Speaker Details</DialogTitle>
          <Cancel
            sx={{ color: "red" }}
            onClick={() => {
              setOpenDialog(false);
            }}
          />
        </Box>
        <DialogContent sx={{ width: "auto" }}>
          {rowsDetails && (
            <Card>
              <Box sx={{ p: 2 }}>
                {/* Image */}
                {rowsDetails.speaker_user.profile_photo && (
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={`http://172.171.210.167/${rowsDetails.speaker_user.profile_photo}`}
                      alt="Speaker"
                      style={{
                        width: "50%",
                        marginBottom: "16px",
                        height: "auto",
                      }}
                    />
                  </Box>
                )}
                {/* Speaker Details */}
                <Typography variant="h6" gutterBottom>
                  {rowsDetails.speaker_user.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Organization: {rowsDetails.speaker_user.organization_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Bio: {rowsDetails.bio}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {rowsDetails.is_active.toString()}
                </Typography>
                {/* Additional details can be added here */}
              </Box>
            </Card>
          )}
        </DialogContent>
      </Dialog>
      {selectedAction && (
        <Typography variant="subtitle1">
          Selected Action: {selectedAction}
        </Typography>
      )}
    </Card>
  );
};

export default DashboardTable;
