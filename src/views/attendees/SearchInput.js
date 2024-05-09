// ** MUI Imports
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import ImportModal from "./Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilteredDataAtten, updateSearchQuery } from "src/store/slice/eventSlice";

const SearchInput = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const attendeesData = useSelector((state) => state.event?.attendeesData?.data);
  
  const handleInputChange = (event) => {
    const query = event.target.value;
    dispatch(updateSearchQuery(query));
    filterData(query);
  };
 
  const filterData = (query) => {
    const filteredData = attendeesData.filter((attendees) =>
      attendees?.attendee_user?.name.toLowerCase().includes(query.toLowerCase())
    //  ||
    //   speaker.organization.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(updateFilteredDataAtten(filteredData));
  };







  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleImport = () => {
    setIsImportModalOpen(true);
  };

  const handleCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  const handleUpload = (file) => {
    // Perform API call to upload the file
    console.log("Uploading file:", file);
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
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
          // onClick={() => router.push("/sponsors/add-sponsors/")}
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
          Add Sponsors
        </div>
        <div
          onClick={handleImport}
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
          Imports
        </div>
      </Box>

      <ImportModal
        open={isImportModalOpen}
        onClose={handleCloseImportModal}
        onUpload={handleUpload}
      />
    </Box>
  );
};

export default SearchInput;
