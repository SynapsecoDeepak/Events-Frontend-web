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
import { ArrowDropDown, ArrowLeft, ArrowRight, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Import axios for making API requests
import {
  deleteEventData,
  eventEditData,
  eventEditDataID,
} from "src/store/slice/eventSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
import toast from "react-hot-toast";
import ConfirmationDialog from "src/components/ConfrimationBox";

const DashboardTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const eventID = useSelector(
    (state) => state?.event?.eventEditDataID
  );
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;

  const eventData = useSelector((state) => state.event?.eventData?.data);

  const statusObj = {
    present: { color: "success" },
    absent: { color: "#E2B675" },
  };

  const filteredData = useSelector((state) => state.event?.filteredDataEvent);

  const searchQuery = useSelector((state) => state?.event?.searchQuery);
  const showResultNotFound =
    (searchQuery && filteredData && filteredData.length === 0) ||
    (searchQuery && !filteredData);

  const dataToRender = filteredData && filteredData.length > 0 ? filteredData : eventData;
    // Pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust the number of items per page as needed
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
      fetchRowDataDetails(selectedRowData.speaker_id); 
    }
  }, [selectedRowData]);

  const fetchRowDataDetails = async (id) => {
    // try {
    //   const response = await axios.get(`${BASE_URL}/user/speakers/${id}/`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   dispatch(speakerDataFullDetails(response.data));
    //   // setOpenDialog(true);
    // } catch (error) {
    //   console.error("Error fetching row data details:", error);
    // }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = (date.getDate() + 1).toString().padStart(2, '0'); 
        // const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };


  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
 
  const handleDeleteConfirmed = async () => {
    console.log('deleid',eventID)
    try {
      const response = await axios.delete(
        `${BASE_URL}/event/
        ${eventID}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Event deleted successfully");
      dispatch(deleteEventData(eventID));
      setAnchorEl(null);
      setConfirmationDialogOpen(false);

    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };
 
  const handleDelete = () => {
    setConfirmationDialogOpen(true);
  };

  const handleClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  setSelectedRowData(null)
  };

  const handleEdit = () => {
    router.push("/createevent/editEvent");
  };



  const handleAction = (event, row) => {
    console.log(row.event_id)
    setAnchorEl(event.currentTarget);
    dispatch(eventEditDataID(row?.event_id));
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
              <TableCell>Event List</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Start Date</TableCell>
             <TableCell>End Date</TableCell>
               <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(currentData) &&
              [...currentData].reverse().map((row) => (
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
                  <TableCell
                    style={{ color: "#2BACE2" }}
                    onClick={() => handleClick(row)}
                  >
                    {row?.venue[0]}
                  </TableCell>
                  <TableCell onClick={() => handleClick(row)}>
                   {formatDate(row?.start_date)}
                  </TableCell>
                  <TableCell onClick={() => handleClick(row)}>
                  {formatDate(row?.end_date)}
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
                      <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
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
      

      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
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
      </Dialog>
    </Card>
  );
};

export default DashboardTable;
