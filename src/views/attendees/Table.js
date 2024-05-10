import React, { useEffect, useState } from "react";
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
import { ArrowDropDown  , ArrowLeft,
  ArrowRight, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "src/constants";
import { attendeesData, attendeesEditData, deleteAttendee, eventEditDataID } from "src/store/slice/eventSlice";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ConfirmationDialog from "src/components/ConfrimationBox";
const DashboardTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // taking speakerIdForDelete from this because using the same eventeditdataid slice to get attendee id
  const attendeeID = useSelector(
    (state) => state?.event?.eventEditDataID
  );

  const rows = useSelector((state) => state.event?.attendeesData?.data);

  const filteredData = useSelector((state) => state.event?.filteredDataAtten);

  const searchQuery = useSelector((state) => state?.event?.searchQueryAtten);
  const showResultNotFound =
    (searchQuery && filteredData && filteredData.length === 0) ||
    (searchQuery && !filteredData);

  const dataToRender =
    filteredData && filteredData.length > 0 ? filteredData : rows;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataToRender?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataToRender?.length / itemsPerPage);




  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;


  useEffect(() => {
    fetchAttendeeData();
  }, [])

  const eventId = useSelector((state) => state?.event?.eventID);

  const fetchAttendeeData = async () => {
   await axios
  .get(
    `${BASE_URL}/event/event_attendees/${eventId}/attendee/`,
    {
      headers: {
        Authorization: `Bearer ${state_token}`,
      },
    }
  )
  .then((response) => {
    console.log("Response:", response.data);
    const attendees_list = response.data;
    dispatch(attendeesData(attendees_list));
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  };



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleDelete = () => {
    setConfirmationDialogOpen(true);
  };


  const handleDeleteConfirmed = async() => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/user/attendees/${attendeeID}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Attendee deleted successfully')
      dispatch(deleteAttendee(attendeeID))
      setAnchorEl(null)
      setConfirmationDialogOpen(false);

    } catch (error) {
      console.error("Error fetching row data details:", error);
    }
    console.log("delete");
  };

  const handleAction = (event, row) => {
    setAnchorEl(event.currentTarget);
// using same eventeditdataid for all to get id of speaker 
    dispatch(eventEditDataID(row?.attendee_id));
    // dispatch(attendeesEditData(row));
  };

  const handleEdit = () => {
    router.push("/attendees/edit-attendees");
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
              <TableCell> Name</TableCell>
              <TableCell> Email</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {dataToRender == null &&(<Typography sx={{margin:'1rem 0rem',paddingLeft:"1rem"}}>Selected event does not have attendee list</Typography>)}

          <TableBody>
            {Array.isArray(dataToRender) &&
              [...dataToRender].reverse().map((row) => (
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
      {/* {selectedAction && (
        <Typography variant="subtitle1">
          Selected Action: {selectedAction}
        </Typography>
      )} */}

<ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </Card>
  );
};

export default DashboardTable;
