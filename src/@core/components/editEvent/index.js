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
import { event, eventEditData } from "src/store/slice/eventSlice";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false }
);

const EventEditForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoPreview, setLogoPreview] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const [loading, setLoading] = useState(true);
  const state_token = useSelector((state) => state.auth.user?.userData?.token);
  const userId = useSelector((state) => state?.auth?.user?.userData?.data?.id);
  const [UserEditAbleData, SetUserEditAbleData] = useState("");
  const eventId = useSelector((state) => state?.event?.eventEditDataID);

  useEffect(() => {
    getEventData();
    fetchVenues();
  }, []);


  const [selectedTimezone, setSelectedTimezone] = useState();

  // Options for the timezone select field
  const timezoneOptions = [
    { value: "PT", label: "Pacific Time (US & Canada)" },
    { value: "ET", label: "Eastern Time (US & Canada)" },
    { value: "CT", label: "Central Time (US & Canada)" },
    { value: "MT", label: "Mountain Time (US & Canada)" },
    { value: "AZT", label: "Arizona Time (US)" },
    { value: "HAT", label: "Hawaii-Aleutian Time (US)" },
    { value: "GMT", label: "Greenwich Mean Time" },
    { value: "BST", label: "British Summer Time" },
    { value: "CET", label: "Central European Time" },
    { value: "JST", label: "Japan Standard Time" },
    { value: "IST", label: "Indian Standard Time" },
    { value: "UTC", label: "Coordinated Universal Time (UTC)" },
  ];

  const handleTimezoneChange = (event) => {
   setSelectedTimezone(event.target.value);
 };

  const getEventData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/event/${eventId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
        },
      });
      SetUserEditAbleData(response.data);
      // dispatch(eventEditData(response.data))
      setLoading(false);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

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

  useEffect(() => {
    // Update form data once UserEditAbleData is available
    if (UserEditAbleData) {
      console.log("user edita data ", UserEditAbleData);
      setFormData({
        name: UserEditAbleData?.data?.name || "",
        shortDescription: UserEditAbleData?.data?.event_short_description || "",
        logo: UserEditAbleData?.data?.event_logo,
        thumbnail: UserEditAbleData?.data?.event_banner,
      });
      setStartDate(
        UserEditAbleData?.data?.start_date
          ? new Date(UserEditAbleData.data.start_date)
          : null
      );
      setEndDate(
        UserEditAbleData?.data?.end_date
          ? new Date(UserEditAbleData.data.end_date)
          : null
      );
      setStartTime(UserEditAbleData?.data?.time || "");
      setEndTime(UserEditAbleData?.data?.end_time || "");
      setDescription(UserEditAbleData?.data?.event_long_description || "");
      setSelectedVenue(UserEditAbleData?.data?.venue[0] || "");
      setLogoPreview(UserEditAbleData?.data?.event_logo);
      setThumbnailPreview(UserEditAbleData?.data?.event_banner);
      setSelectedTimezone(UserEditAbleData?.data?.timezone)
console.log('logo previ',logoPreview)
    }
  }, [UserEditAbleData]);

  const CookiesToken = Cookies.get("token");
  const token = CookiesToken || state_token;
  const [formData, setFormData] = useState({
    name: UserEditAbleData?.data?.name,
    shortDescription: UserEditAbleData?.data?.event_short_description,
    logo: null,
    thumbnail: null,
  });
  const [startDate, setStartDate] = useState(
    UserEditAbleData?.data?.start_date
      ? new Date(UserEditAbleData.data.start_date)
      : null
  );
  const [endDate, setEndDate] = useState(
    UserEditAbleData?.data?.end_date
      ? new Date(UserEditAbleData.data.end_date)
      : null
  );
  const [startTime, setStartTime] = useState(
    UserEditAbleData?.data?.time || ""
  );
  const [endTime, setEndTime] = useState(
    UserEditAbleData?.data?.end_time || ""
  );

  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(
    UserEditAbleData?.data?.venue[0] || ""
  );
  const [venueName, setVenueName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [open, setOpen] = useState(false);

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
    // Check if the selected start date is after the current end date
    if (endDate && date > endDate) {
      // Update the end date to be the same as the new start date
      setEndDate(date);
    }
    // Update the start date
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      setEndDate(startDate);
      toast.error("End date cannot be before start date");
    } else {
      setEndDate(date);
    }
  };

  const handleStartTimeChange = (event) => {
    const selectedTime = event.target.value;
    const selectedDate = startDate || new Date(); // Use startDate if available, else use current date
    const currentDate = new Date();
    if (moment(selectedDate).isSame(currentDate, 'day')) {
      // If the selected date is the current date
      const currentTime = moment().format("HH:mm");
      if (moment(selectedTime, "HH:mm").isBefore(moment(currentTime, "HH:mm"))) {
        // If selected time is in the past, set it to the current time
        setStartTime(currentTime);
        toast.error("Start time cannot be in the past");
      } else {
        setStartTime(selectedTime);
      }
    } else {
      // If the selected date is a future date, allow any time selection
      setStartTime(selectedTime);
    }
  };


  const handleEndTimeChange = (event) => {
    const selectedTime = event.target.value;
    const currentDate = moment().format("YYYY-MM-DD");
    // Check if start date is less than end date
    if (moment(startDate).isBefore(endDate, 'day')) {
      // If start date is less than end date, allow any time selection
      setEndTime(selectedTime);
    } else {
      // If start date is equal to end date or after end date, enforce end time validation
      const currentTime = moment().format("HH:mm");
      // Check if the selected time is before the start time
      if (moment(selectedTime, "HH:mm").isBefore(moment(startTime, "HH:mm"))) {
        setEndTime(startTime); // Set end time to be equal to start time
        toast.error("End time cannot be less than start time");
      } else {
        setEndTime(selectedTime);
      }
    }
  };



  const handleSubmitCustomVenue = async () => {

    if(!pdfFile || pdfFile == null){
      toast.error("Please Upload Pdf Location details")
      return;
    }
    if(!venueName || venueName == ''){
      toast.error("Please Enter Venue Name")
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", venueName);
      formData.append("location_details", pdfFile);
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

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB

// Function to check if the image size is exactly 5 MB
const isValidImageSize = (file) => {
  const fileSizeMB = file.size / (1024 * 1024); // Convert file size to MB
  return fileSizeMB <= 5; // Return true if the file size is less than or equal to 5 MB
};

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!isValidImageSize(file)) {
      toast.error(`Image size should not exceed ${MAX_FILE_SIZE_MB} MB`);
      return;
    }
    
          // Ensure logo dimensions are 150x150 px
  const image = new Image();
  image.onload = function () {
    if (this.width !== 150 || this.height !== 150) {
      toast.error("Logo dimensions should be 150x150 px");
      return;
    }
  }

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
    if (!isValidImageSize(file)) {
      toast.error(`Image size should not exceed ${MAX_FILE_SIZE_MB} MB`);
      return;
    }


    const image = new Image();
    image.onload = function () {
      if (this.width !== 300 || this.height !== 250) {
        toast.error("Banner dimensions should be 300x250 px");
        return;
      }
    }
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

    const fieldsToCheck = [
      { field: startDate, message: 'Please select start date' },
      { field: endDate, message: 'Please select end date' },
      { field: formData.logo, message: 'Please select Logo' },
      { field: formData.thumbnail, message: 'Please select Event Banner' },
      { field: startTime, message: 'Please select start time' },
      { field: endTime, message: 'Please select end time' },
      { field: selectedVenue, message: 'Please select venue' },
      { field: formData.name, message: 'Please  enter event name' },
      { field: formData.logo, message: 'Please select logo' },
      { field: formData.thumbnail, message: 'Please select banner' },
      { field: selectedTimezone, message: 'Please select Time Zone' },

    
    ];
    
    for (const fieldObj of fieldsToCheck) {
      if (!fieldObj.field) {
        toast.error(fieldObj.message);
        return; // Stop further execution if any field is empty
      }
    }

    event.preventDefault(); // Prevent default form submission
    const formDataToSend = new FormData(); // Create a new FormData object
    formDataToSend.append("name", formData.name);
    formDataToSend.append("user", userId);
    formDataToSend.append("event_short_description", formData.shortDescription);
    formDataToSend.append("venue", selectedVenue);
    formDataToSend.append("event_long_description", description);
    formDataToSend.append("timezone", selectedTimezone);

    const startDateOnly = startDate
      ? moment(startDate).format("YYYY-MM-DD")
      : null;
    const endDateOnly = endDate ? moment(endDate).format("YYYY-MM-DD") : null;
    formDataToSend.append("start_date", startDateOnly);
    formDataToSend.append("time", startTime);
    formDataToSend.append("end_date", endDateOnly);
    formDataToSend.append("end_time", endTime);
    // formDataToSend.append("event_logo", formData.logo); // Append logo file
    // formDataToSend.append("event_banner", formData.thumbnail); // Append thumbnail file



    if (typeof formData.logo === 'string') {
      try {
        const response = await axios.get(formData.logo, { responseType: 'blob' });
        const file = new File([response.data], 'logo.png', { type: response.data.type });
        formDataToSend.append("event_logo", file);
      } catch (error) {
        console.error('Error fetching logo:', error);
        toast.error('Error fetching logo. Please upload a new logo.');
        return;
      }
    } else {
      formDataToSend.append("event_logo", formData.logo);
    }
   
    // If thumbnail is a URL, try to fetch the file and append it to formDataToSend
    if (typeof formData.thumbnail === 'string') {
      try {
        const response = await axios.get(formData.thumbnail, { responseType: 'blob' });
        const file = new File([response.data], 'thumbnail.png', { type: response.data.type });
        formDataToSend.append("event_banner", file);
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
        toast.error('Error fetching thumbnail. Please upload a new thumbnail.');
        return;
      }
    } else {
      formDataToSend.append("event_banner", formData.thumbnail);
    }
   

    try {
      const response = await axios.put(
        `${BASE_URL}/event/newevents/${eventId}/`,
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
      setLogoPreview(null);
      setThumbnailPreview(null);
      fetchEventData();

      toast.success("The Event added successfully");
      router.back();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [description, setDescription] = useState(
    UserEditAbleData?.data?.event_long_description
  );

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
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
                  <option value="">{selectedVenue}</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name || "null"}
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
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
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
                theme="snow" // or 'bubble' for a simpler toolbar
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
                    dateFormat="MM/dd/yyyy"
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
                    dateFormat="MM/dd/yyyy"
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

            {/* time zone  */}
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
          <label className={styles.label}>Timezone</label>
        </div>
        <div>
          <select
            value={selectedTimezone}
            onChange={handleTimezoneChange}
            className={styles.input}
          >
            <option value="">Select</option>
            {timezoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
                  accept=".png, .jpg, .jpeg" // Update accept attribute

                  onChange={handleImageChange}
                  value={formData?.logo?.file?.name}
                  className={styles.fileInput}
                />

                <label htmlFor="logo" className={styles.customButton}>
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
                <label className={styles.label}>Event Banner</label>
              </div>
              <div className={styles.fileInputContainer}>
                <input
                  placeholder="choose file"
                  type="file"
                  accept=".png, .jpg, .jpeg" // Update accept attribute

                  id="thumbnail"
                  onChange={handleImageChange2}
                  value={formData?.thumbnail?.file?.name}
                  className={styles.fileInput}
                />

                <label htmlFor="thumbnail" className={styles.customButton}>
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
      )}
    </>
  );
};

export default EventEditForm;
