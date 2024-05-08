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
import { ArrowDropDown, Cancel, Router } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios for making API requests
import {
  deleteSponsors,
  sponsorData,
  sponsorDataFullDetails,
  sponsorsEditData,
} from "src/store/slice/eventSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
import toast from "react-hot-toast";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const eventId = useSelector((state) => state?.event?.eventID);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);



  const fetchSponsorsData = async () => {
   await axios
    .get(
      `${BASE_URL}/event/event_sponsors/${eventId}/sponsors/`,
      {
        headers: {
          Authorization: `Bearer ${state_token}`,
        },
      }
    )
    .then((response) => {
      console.log("sponsors", response.data);
      const sponsors_list = response.data;
      dispatch(sponsorData(sponsors_list));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
  useEffect(() => {
    fetchSponsorsData();
  }, [])
  

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);

  const rows = useSelector((state) => state.event?.sponsorData?.data);
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;
  const rowsDetails = useSelector(
    (state) => state.event?.sponsorDataFullDetails?.data
  );
  const UserEditAbleData = useSelector(
    (state) => state?.event?.sponsorsEditData
  );

  const statusObj = {
    true: { color: "#5EAF41" },
    false: { color: "#E2B675" },
  };

  useEffect(() => {
    if (selectedRowData) {
      // Fetch additional data when selectedRowData changes
      fetchRowDataDetails(selectedRowData.sponsor_id); // Assuming id exists in selectedRowData, replace it with your actual identifier
    }
  }, [selectedRowData]);

  const fetchRowDataDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/event/sponsors/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(sponsorDataFullDetails(response.data));
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
    router.push("/sponsors/edit-sponsors");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/event/sponsors/${UserEditAbleData?.sponsor_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Sponsor deleted successfully");
      dispatch(deleteSponsors(UserEditAbleData?.sponsor_id));
      setAnchorEl(null);
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };

  const handleAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    dispatch(sponsorsEditData(row));
  };
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Sponsor Title</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Sponsored Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {rows == null &&(<Typography sx={{margin:'1rem 0rem',paddingLeft:"1rem"}}>Selected event does not have sponsor list</Typography>)}

          <TableBody>
            {Array.isArray(rows) &&
               [...rows].reverse().map((row) => (
                <TableRow
                  hover
                  key={row?.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    onClick={() => handleClick(row)}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {row?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    style={{ color: "#2BACE2" }}
                    onClick={() => handleClick(row)}
                  >
                    {row?.contact_primary_name}
                  </TableCell>
                  <TableCell onClick={() => handleClick(row)}>
                    {row?.amount}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px !important" }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: statusObj[row?.is_active.toString()].color,
                        color: "white !important",
                        padding: "5px",
                        width: "68px",
                        height: "22px",
                      }}
                    >
                      {row?.is_active?.toString()}
                    </Button>
                  </TableCell>
                  <TableCell>
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
                      {/* <MenuItem onClick={() => handleClick(row)}>View</MenuItem> */}
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
      {/* Dialog Box */}

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
          <DialogTitle>Sponsors Details</DialogTitle>
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
                {rowsDetails?.thumbnail && (
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={`http://172.171.210.167/${rowsDetails?.thumbnail}`}
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
