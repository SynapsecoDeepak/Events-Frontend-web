import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const ImportModal = ({ open, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // You can perform validation here before uploading
    onUpload(selectedFile);
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ width: 500, bgcolor: "background.paper", borderRadius: 2, p: 10 }}
      >
        <Typography variant="h4" gutterBottom>
          Upload Excel File
        </Typography>
        <Typography variant="body1" mb={2}>
          Please select the Excel file you want to upload.
        </Typography>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImportModal;
