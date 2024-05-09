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
import { ArrowDropDown, ArrowLeft, ArrowRight, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registrationData } from "src/store/slice/eventSlice";
import axios from "axios";
import { BASE_URL } from "src/constants";


const statusObj = {
  absent: { color: "success" },
  present: { color: "#E2B675" },
};
const statusObj2 = {
  "true": { color: "success" },
  "false": { color: "#E2B675" },
};

const DashboardTable = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  


  const eventId = useSelector((state) => state?.event?.eventID);
  const userId = useSelector((state) => state.auth.user?.userData?.data?.id);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);

  useEffect(() => {
    fetchRegistrationData();
  }, [])

  const fetchRegistrationData = async () => {
   await axios
    .post(
      `${BASE_URL}/user/registration_list/`,
        {
          "event_id":eventId,
          "user_id":userId   
      },
      {
        headers: {
          Authorization: `Bearer ${state_token}`,
        },
      }
    )
    .then((response) => {
      const registration_list = response.data;
      dispatch(registrationData(registration_list));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }


  const rowsDetails = useSelector(
    (state) => state.event?.registrationData?.data
  );


  const filteredData = useSelector((state) => state.event?.filteredDataRegis);

  const searchQuery = useSelector((state) => state?.event?.searchQuery);
  const showResultNotFound =
    (searchQuery && filteredData && filteredData.length === 0) ||
    (searchQuery && !filteredData);

  const dataToRender =
    filteredData && filteredData.length > 0 ? filteredData : rowsDetails;


    // Pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

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


  console.log('registrationdatat',rowsDetails)

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
      {showResultNotFound ? (
          <Typography sx={{ margin: "1rem 0rem", paddingLeft: "1rem" }}>
            No results found
          </Typography>
        ) : (
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
          {currentData == null &&(<Typography sx={{margin:'1rem 0rem',paddingLeft:"1rem"}}>Selected event does not have registration list</Typography>)}
          <TableBody>
          {Array.isArray(currentData) &&
               [...currentData].reverse().map((row) => (
            // {rowsDetails?.map((row) => (
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
      </TableContainer>    </Card>
  );
};

export default DashboardTable;
