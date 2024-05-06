import styles from "src/views/speaker/speaker.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "src/constants";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { event } from "src/store/slice/eventSlice";


import dynamic from 'next/dynamic'

// // ! To avoid 'Window is not defined' error
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Dynamically import ReactQuill with Snow theme
const ReactQuill = dynamic(() => import('react-quill').then(mod => mod.default), { ssr: false });

const EventCreateForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const userId = useSelector((state) => state?.auth?.user?.userData?.data?.id);
  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [venueName, setVenueName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch venue data from the map API
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/event/venues/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        });
        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueInputChange = (event) => {
    setVenueName(event.target.value);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartDateChange = (date) => {
    if (date < new Date()) {
      setStartDate(new Date());
    } else {
      setStartDate(date);
    }
  };

  // const handleEndDateChange = (date) => {
  //   if (date < new Date()) {
  //     setEndDate(new Date());
  //     toast.error("End date cannot be in the past");
  //   } else {
  //     setEndDate(date);
  //   }
  // };
  const handleEndDateChange = (date) => {
    // Check if the selected date is before the start date
    if (date < startDate) {
      // If it's before the start date, set the end date to the start date
      setEndDate(startDate);
      toast.error("End date cannot be before start date");
    } else {
      // If it's after or equal to the start date, set the end date to the selected date
      setEndDate(date);
    }
  };

  const handleStartTimeChange = (event) => {
    const selectedTime = event.target.value;
    const currentTime = moment().format("HH:mm");
    if (moment(selectedTime, "HH:mm").isBefore(moment(currentTime, "HH:mm"))) {
      setStartTime(currentTime);
      toast.error("Start time cannot be in the past");
    } else {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event) => {
    const selectedTime = event.target.value;
    const currentTime = moment().format("HH:mm");
    if (moment(selectedTime, "HH:mm").isBefore(moment(currentTime, "HH:mm"))) {
      setEndTime(currentTime);
      toast.error("End time cannot be in the past");
    } else {
      setEndTime(selectedTime);
    }
  };

  const handleSubmitCustomVenue = async () => {
    try {
      // Construct form data with venue name and PDF file
      const formData = new FormData();
      formData.append("name", venueName);
      formData.append("location_details", pdfFile);

      // Send POST request to the API
      const response = await axios.post(
        `${BASE_URL}/event/add_venue/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data.data.name);
      const newVenue = response.data.data.name;
      setVenues([...venues], newVenue);
      // Clear form fields
      setOpen(false);
      setVenueName("");
      setPdfFile(null);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    logo: null,
    thumbnail: null,
  });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, logo: file });

    // Generate preview URL for logo
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, thumbnail: file });

    // Generate preview URL for thumbnail
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/event/events_list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("evnet list ", response.data);
      const eventData = response.data;
      dispatch(event(eventData));
    } catch (error) {
      console.error("api error", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formDataToSend = new FormData(); // Create a new FormData object

    // Append each field to FormData object
    formDataToSend.append("name", formData.name);
    formDataToSend.append("user", userId);
    formDataToSend.append("shortDescription", formData.shortDescription);
    formDataToSend.append("venue", selectedVenue);
    formDataToSend.append("longDescription", description);

      // Extract only the date part from startDate and endDate
  const startDateOnly = startDate ? moment(startDate).format("YYYY-MM-DD") : null;
  const endDateOnly = endDate ? moment(endDate).format("YYYY-MM-DD") : null;


    formDataToSend.append("start_date", startDateOnly);
    formDataToSend.append("startTime", startTime);
    formDataToSend.append("end_date", endDateOnly);
    formDataToSend.append("endTime", endTime);
    formDataToSend.append("logo", formData.logo); // Append logo file
    formDataToSend.append("thumbnail", formData.thumbnail); // Append thumbnail file
    try {
      const response = await axios.post(
        `${BASE_URL}/event/create_event/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      setFormData({
        name: "",
        shortDescription: "",
        logo: null,
        thumbnail: null,
      });
      setSelectedVenue("");
      setStartDate(null);
      setStartTime("");
      setEndDate(null);
      setEndTime("");
      setDescription("");
      setLogoPreview(null)
      setThumbnailPreview(null)
      fetchEventData();

      toast.success("The Event added successfully");
      // router.back();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Event Name</label>
          </div>
          <div>
            <input
              id="name"
              onChange={handleInputChange("name")}
              value={formData.name}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label className={styles.label}>Short Description</label>
          </div>
          <div>
            <input
              id="shortDescription"
              onChange={handleInputChange("shortDescription")}
              value={formData.shortDescription}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.column}>
          <div>
            <label className={styles.label}>Venue</label>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select
              value={selectedVenue}
              onChange={handleVenueChange}
              className={styles.input}
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name || 'null'}
                </option>
              ))}
            </select>
            <Button variant="outlined" onClick={handleOpen}>
              <Add />
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "1rem",
            p: 8,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Venue
          </Typography>
          <TextField
            label="Venue Name"
            variant="outlined"
            value={venueName}
            onChange={handleVenueInputChange}
            fullWidth
            sx={{ mb: 2, mt: 4 }}
          />
          <input
            type="file"
            style={{ marginTop: "1rem" }}
            onChange={handlePdfFileChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="contained" onClick={handleSubmitCustomVenue}>
              OK
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Long description div */}
      <div
        className={styles.column}
        style={{ width: "100%", marginTop: "2rem" }}
      >
        <div>
          <label className={styles.label}>Long Description</label>
        </div>
        <div>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            theme='snow' // or 'bubble' for a simpler toolbar
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "2rem",
          justifyContent: "space-between",
          gap: "10em",
          marginBottom: 25,
        }}
      >
        {/* start data and time  */}
        <div
          style={{
            display: "flex",
            width: "50%",
            marginTop: "2rem",
            justifyContent: "flex-start",
            gap: "1em",
            marginBottom: 25,
          }}
        >
          <div className={styles.column}>
            <div>
              <label className={styles.label}>Start Date</label>
            </div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <label className={styles.label}>Start Time</label>
            </div>
            <div>
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* end data and time  */}
        <div
          style={{
            display: "flex",
            width: "50%",
            marginTop: "2rem",
            justifyContent: "flex-start",
            gap: "1em",
            marginBottom: 25,
          }}
        >
          <div className={styles.column}>
            <div>
              <label className={styles.label}>End Date</label>
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <label className={styles.label}>End Time</label>
            </div>
            <div>
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      ></div>

      {/* logo and thumbnail div */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          gap: "10em",
          marginBottom: 25,
        }}
      >
        <div className={styles.column} style={{ width: "35%" }}>
          <div>
            <label className={styles.label}>Logo</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              id="logo"
              onChange={handleImageChange}
              value={formData?.logo?.file?.name}
              className={styles.fileInput}
            />

            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
          </div>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className={styles.previewImage}
            />
          )}
        </div>
        <div className={styles.column} style={{ width: "35%" }}>
          <div>
            <label className={styles.label}>Thumbnail</label>
          </div>
          <div className={styles.fileInputContainer}>
            <input
              placeholder="choose file"
              type="file"
              id="thumbnail"
              onChange={handleImageChange2}
              value={formData?.thumbnail?.file?.name}
              className={styles.fileInput}
            />

            <label for="fileInput" className={styles.customButton}>
              Choose File
            </label>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#707070" }}>
              Example: Accepts PNG, GIF, JPG, JPEG
            </span>
          </div>
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className={styles.previewImage}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        {/* <div className={styles.column} style={{width:'48%'}}>
          <div>
            <label className={styles.label}>Sessions</label>
          </div>
          <div>
            <input
              placeholder="choose your sessions"
              className={styles.input}
            />
          </div>
        </div> */}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventCreateForm;