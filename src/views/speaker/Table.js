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
import {
  ArrowDropDown,
  ArrowLeft,
  ArrowRight,
  Cancel,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios for making API requests
import {
  deleteSpeaker,
  eventEditDataID,
  speakerData,
  speakerDataFullDetails,
  speakerEditData,
} from "src/store/slice/eventSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
import toast from "react-hot-toast";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const eventId = useSelector((state) => state?.event?.eventID);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  // taking speakerIdForDelete from this because using the same eventeditdataid slice to get speaker id
  const speakerIdForDelete = useSelector(
    (state) => state?.event?.eventEditDataID
  );

  const fetchSpeakerData = async () => {
    await axios
      .post(
        `${BASE_URL}/event/event_speakers/`,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${state_token}`,
          },
        }
      )
      .then((response) => {
        console.log("speaker:", response.data);
        const speaker_data = response.data;
        dispatch(speakerData(speaker_data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchSpeakerData();
  }, []);

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const rows = useSelector((state) => state.event?.speakerData?.data);
  const filteredData = useSelector((state) => state.event?.filteredData);

  const searchQuery = useSelector((state) => state?.event?.searchQuery);
  const showResultNotFound =
    (searchQuery && filteredData && filteredData.length === 0) ||
    (searchQuery && !filteredData);

  const dataToRender =
    filteredData && filteredData.length > 0 ? filteredData : rows;

  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;
  const rowsDetails = useSelector(
    (state) => state.event?.speakerDataFullDetails?.data?.speaker_user
  );

  const statusObj = {
    present: { color: "success" },
    absent: { color: "#E2B675" },
  };

  // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataToRender?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataToRender?.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Pagination end

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
    setSelectedRowData(null);
  };

  const handleEdit = () => {
    router.push("/speaker/edit-speaker");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/user/speakers/${speakerIdForDelete}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Speaker deleted successfully");
      dispatch(deleteSpeaker(speakerIdForDelete));
      setAnchorEl(null);
    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };

  const handleAction = (event, row) => {
    console.log('rowid',row.speaker_id)
    setAnchorEl(event.currentTarget);
// using same eventeditdataid for all to get id of speaker 
    dispatch(eventEditDataID(row?.speaker_user?.id));

    // dispatch(speakerEditData(row));
  };

  return (
    <Card>
      <TableContainer>
        {showResultNotFound ? (
          <Typography sx={{ margin: "1rem 0rem", paddingLeft: "1rem" }}>
            No results found
          </Typography>
        ) : (
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
            {currentData == null && (
              <Typography sx={{ margin: "1rem 0rem", paddingLeft: "1rem" }}>
                Selected event does not have speaker list
              </Typography>
            )}

            <TableBody>
              {Array.isArray(currentData) &&
                [...currentData].reverse().map((row) => (
                  <TableRow
                    hover
                    key={row?.speaker_user?.name}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
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
                          {row?.speaker_user?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{ color: "#2BACE2" }}
                      onClick={() => handleClick(row)}
                    >
                      {row?.speaker_user?.organization_name}
                    </TableCell>
                    <TableCell onClick={() => handleClick(row)}>
                      {row?.date}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px !important" }}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: statusObj[row?.speaker_user?.status].color,
                          padding: "5px",
                          width: "68px",
                          height: "22px",
                        }}
                      >
                        {row?.speaker_user?.status}
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
                        <MenuItem onClick={() => handleEdit(row)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(row)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

            <div>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button  key={index} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Button>
              ))}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowRight />
              </Button>
            </div>
          </Table>
        )}
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
          <Cancel sx={{ color: "red" }} onClick={handleClose} />
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
