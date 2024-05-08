// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateFilteredData, updateSearchQuery } from "src/store/slice/eventSlice";
const SearchInput = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const speakerData = useSelector((state) => state.event?.speakerData?.data);
  
  const handleInputChange = (event) => {
    const query = event.target.value;
    dispatch(updateSearchQuery(query));
    filterData(query);
  };
 
  const filterData = (query) => {
    const filteredData = speakerData.filter((speaker) =>
      speaker?.speaker_user?.name.toLowerCase().includes(query.toLowerCase())
    //  ||
    //   speaker.organization.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(updateFilteredData(filteredData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 400,
          height: 40,
          borderRadius: 40,
          marginLeft: 20,
          paddingLeft: 4,
          paddingRight: 4,
          background: "#fff",
        }}
      >
        <img
          width={20}
          height={20}
          style={{ marginRight: 10 }}
          alt="paypal"
          src="/search_icon.svg"
        />
        <input
          style={{ border: "none", width: "100%" }}
          type="text"
          onChange={handleInputChange}
          placeholder="Search speaker name and organization"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          width={20}
          height={20}
          style={{ marginRight: 10 }}
          alt="paypal"
          src="/page_one.svg"
        />
        <img
          width={20}
          height={20}
          style={{ marginRight: 10 }}
          alt="paypal"
          src="/page_two.svg"
        />
        <div
          onClick={() => router.push("/speaker/add-speaker")}
          style={{
            width: 160,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            color: "white",
            cursor: "pointer",
            /* UI Properties */
            background: "#2BACE2 0% 0% no-repeat padding-box",
            borderRadius: 10,
          }}
        >
          <img
            width={20}
            height={20}
            style={{ marginRight: 10 }}
            alt="paypal"
            src="/add_more.svg"
          />
          Add Speaker
        </div>
      </Box>
    </Box>
  );
};

export default SearchInput;
